import { Component, OnInit , ChangeDetectorRef} from '@angular/core'; // Core Angular features
import { Product, ProductService } from '../../features/products/product.service'; // Product types + service
import { CartService } from '../../shared/services/cart.service'; // Cart management service
import { Router, RouterLink } from '@angular/router'; // Routing utilities
import { CommonModule } from '@angular/common'; // Common directives

interface RoutineStep {
  step:string; // Step number
  icon:string; // Step icon
  label:string; // Step label
  products: Product[]; // Products in step
}

@Component({
  selector: 'app-routine-result',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './routine-result.html',
  styleUrl: './routine-result.scss',
})
export class RoutineResult implements OnInit{

  answers: Record<number, string> = {}; // Quiz answers
  allProducts: Product[] = []; // All products list
  routineSteps: RoutineStep[] = []; // Generated routine steps
  loading = true; // Loading state
  pdfGenerating = false; // PDF generation state

  // Map quiz answers to readable labels
  private skinTypeMap: Record<string, string> = {
    dry: 'Dry',
    oily: 'Oily',
    combination: 'Combination',
    sensitive: 'Sensitive',
  };

  private concernMap: Record<string, string> = {
    acne: 'Acne',
    hydration: 'Moisturizer',
    aging: 'Anti-Aging',
    brightening: 'Pigmentation',
  };

  constructor(
    private router: Router, // Router navigation
    private productService: ProductService, // Product API service
    private cartService: CartService, // Cart service
    private cdr: ChangeDetectorRef, // Manual change detection
  ) {
    const nav = this.router.getCurrentNavigation(); // Get navigation state
    if (nav?.extras?.state?.['answers']) {
      this.answers = nav.extras.state['answers']; // From navigation state
    } else {
      const state = history.state; // Fallback to history state
      if (state?.answers) {
        this.answers = state.answers; // Restore answers
      }
    }
  }

  ngOnInit(): void {
    if (Object.keys(this.answers).length === 0) {
      this.router.navigate(['/'], { fragment: 'routine-builder' }); // Redirect if no answers
      return;
    }

    this.productService.getProducts().subscribe({
      next: products => {
        this.allProducts = products; // Store products
        this.buildRoutine(); // Generate routine
        this.loading = false; // Stop loading
        this.cdr.detectChanges(); // Refresh UI
      },
      error: () => {
        this.loading = false; // Stop loading on error
      }
    });
  }

  private buildRoutine(): void {

    const skinType = this.skinTypeMap[this.answers[0]] ?? ''; // Map skin type
    const concern = this.concernMap[this.answers[1]] ?? ''; // Map concern

    const matched = this.allProducts.filter(p =>
      (skinType && p.skin_type?.toLowerCase().includes(skinType.toLowerCase())) ||
      (concern && (
        p.skin_concern?.toLowerCase().includes(concern.toLowerCase()) ||
        p.category?.toLowerCase().includes(concern.toLowerCase())
      ))
    );

    const pool = matched.length >= 3 ? matched : this.allProducts; // Fallback pool

    // Pick products per routine step
    const cleanser   = pool.find(p => p.category === 'Cleanser');
    const treatment  = pool.find(p => p.category === 'Serum' || p.category === 'Treatment');
    const moisturizer = pool.find(p => p.category === 'Moisturizer' && p.id !== cleanser?.id && p.id !== treatment?.id);
    const sunscreen  = this.allProducts.find(p => p.category === 'Sunscreen');

    this.routineSteps = [
      { step: '01', icon: '🧴', label: 'Cleanse',    products: cleanser    ? [cleanser]    : [] },
      { step: '02', icon: '✨', label: 'Treat',      products: treatment   ? [treatment]   : [] },
      { step: '03', icon: '💧', label: 'Moisturize', products: moisturizer ? [moisturizer] : [] },
      { step: '04', icon: '☀️', label: 'Protect',    products: sunscreen   ? [sunscreen]   : [] },
    ].filter(s => s.products.length > 0); // Remove empty steps
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: 1,
    }); // Add single product to cart
  }

  addAllToCart(): void {
    this.routineSteps.forEach(step => {
      step.products.forEach(p => this.addToCart(p)); // Add all routine products
    });
  }

  getSkinLabel(): string {
    const labels: Record<string, string> = {
      dry: 'Dry',
      oily: 'Oily',
      combination: 'Combination',
      sensitive: 'Sensitive'
    };
    return labels[this.answers[0]] ?? 'Your'; // Fallback label
  }

  getConcernLabel(): string {
    const labels: Record<string, string> = {
      acne: 'Acne & Pores',
      hydration: 'Hydration',
      aging: 'Anti-Aging',
      brightening: 'Brightening'
    };
    return labels[this.answers[1]] ?? 'Skincare'; // Fallback label
  }

  getRoutineTotal(): number {
    return this.routineSteps.reduce((sum, step) =>
      sum + step.products.reduce((s, p) => s + Number(p.price), 0), 0
    ); // Total routine price
  }

  async exportPdf(): Promise<void> {
    this.pdfGenerating = true; // Start PDF generation

    try {
      const { jsPDF } = await import('jspdf'); // Dynamic import
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const teal   = [26, 122, 110] as [number, number, number]; // Theme color
      const ink    = [20, 20, 18]   as [number, number, number]; // Text color
      const grey   = [74, 74, 70]   as [number, number, number]; // Secondary text
      const lgrey  = [232, 232, 229] as [number, number, number]; // Light divider

      // Header bar
      doc.setFillColor(...teal);
      doc.rect(0, 0, 210, 28, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('PharmaGrid', 20, 12);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Pharmacy-Grade Skincare', 20, 19);

      doc.setFontSize(9);
      doc.text(`Generated ${new Date().toLocaleDateString('en-GB')}`, 170, 12, { align: 'right' });

      // Title
      doc.setTextColor(...ink);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('Your Personalised Routine', 20, 44);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grey);
      doc.text(`Skin type: ${this.getSkinLabel()}  ·  Primary concern: ${this.getConcernLabel()}`, 20, 52);

      // Divider
      doc.setDrawColor(...lgrey);
      doc.setLineWidth(0.4);
      doc.line(20, 57, 190, 57);

      let y = 67; // Vertical cursor

      this.routineSteps.forEach((step, idx) => {

        // Step header block
        doc.setFillColor(...teal);
        doc.roundedRect(20, y - 5, 170, 8, 2, 2, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${step.step}  ${step.label}`, 25, y);

        y += 12;

        step.products.forEach(p => {

          doc.setTextColor(...ink);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(`${p.brand} — ${p.name}`, 25, y); // Product title

          y += 6;

          doc.setTextColor(...grey);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');

          const desc = p.description ?? '';
          const lines = doc.splitTextToSize(desc.substring(0, 180), 160); // Wrap text
          doc.text(lines, 25, y);

          y += lines.length * 4.5 + 2;

          doc.setTextColor(...teal);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(`€${Number(p.price).toFixed(2)}`, 25, y); // Price

          y += 10;
        });

        if (idx < this.routineSteps.length - 1) {
          doc.setDrawColor(...lgrey);
          doc.line(20, y, 190, y); // Separator line
          y += 8;
        }
      });

      // Footer
      doc.setFillColor(...teal);
      doc.rect(0, 280, 210, 17, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('PharmaGrid · Pharmacy-grade skincare curated by dermatologists', 105, 290, { align: 'center' });

      doc.save(`pharmagrid-routine-${Date.now()}.pdf`); // Download file

    } catch (e) {
      console.error('PDF error:', e); // Error handling
    }

    this.pdfGenerating = false; // End loading state
    this.cdr.detectChanges(); // Refresh UI
  }

  formatPrice(price: any): string {
    return Number(price).toFixed(2); // Format price
  }

  retakeQuiz(): void {
    this.router.navigate(['/'], { fragment: 'routine-builder' }); // Restart quiz
  }
}