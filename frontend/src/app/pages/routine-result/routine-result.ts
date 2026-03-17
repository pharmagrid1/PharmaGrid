import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../features/products/product.service';
import { CartService } from '../../shared/services/cart.service';
import { Router, RouterLink } from '@angular/router';



interface RoutineStep {
  step:string;
  icon:string;
  label:string;
  products: Product[];
}
@Component({
  selector: 'app-routine-result',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './routine-result.html',
  styleUrl: './routine-result.scss',
})


export class RoutineResult implements OnInit{
  answers: Record<number, string> = {};
  allProducts: Product[] = [];
  routineSteps: RoutineStep[] = [];
  loading = true;
  pdfGenerating = false;

  //map quiz answers to product categories/skin types
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
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['answers']) {
      this.answers = nav.extras.state['answers'];
    }
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products=> {
      this.allProducts = products;
      this.buildRoutine();
      this.loading = false;
    });
  }

  private buildRoutine():void{
    const skinType = this.skinTypeMap[this.answers[0]] ?? '';
    const concern = this.concernMap[this.answers [1]] ?? '';
  
    //filter products matching skin type or concern
      const matched = this.allProducts.filter(p =>
      (skinType && p.skin_type?.toLowerCase().includes(skinType.toLowerCase())) 
      ||(concern  && (p.skin_concern?.toLowerCase().includes(concern.toLowerCase()) 
      ||p.category?.toLowerCase().includes(concern.toLowerCase())))
  ); 
      //Fallback: if not enough matches use all products
      const pool = matched.length >= 3 ? matched: this.allProducts;
      
      //Build 3 routine steps
      const cleanser = pool.find(p => p.category === 'Cleanser') ?? pool[0];
      const treatment = pool.find(p => p.category === 'Serum' || p.category === 'Treatment') ?? pool[1];
      const moisturizer = pool.find(p => p.category === 'Moisturizer') ?? pool[2];
      const sunscreen = this.allProducts.find(p => p.category === 'Sunscreen');

      //steps
      this.routineSteps = [
      { step: '01', icon: '🧴', label: 'Cleanse',    products: cleanser    ? [cleanser]    : [] },
      { step: '02', icon: '✨', label: 'Treat',      products: treatment   ? [treatment]   : [] },
      { step: '03', icon: '💧', label: 'Moisturize', products: moisturizer ? [moisturizer] : [] },
      { step: '04', icon: '☀️', label: 'Protect',    products: sunscreen   ? [sunscreen]   : [] },
      ].filter(s => s.products.length > 0);
    } //

    addToCart(product: Product): void {
      this.cartService.addToCart({
         id: product.id, name: product.name, brand: product.brand,
        price: product.price, image: product.image, quantity: 1,
      });
    }

    addAllToCart(): void {
      this.routineSteps.forEach(step => {
        step.products.forEach(p=> this.addToCart(p));
      });
    }

    getSkinLabel(): string {
      const labels: Record<string, string> = {
      dry: 'Dry', oily: 'Oily', combination: 'Combination', sensitive: 'Sensitive'
    };
    return labels[this.answers[0]] ?? 'Your';
    }

    getConcernLabel(): string {
      const labels: Record<string, string> = {
      acne: 'Acne & Pores', hydration: 'Hydration',
      aging: 'Anti-Aging', brightening: 'Brightening'
    };
    return labels[this.answers[1]] ?? 'Skincare';
    }

  getRoutineTotal(): number {
  return this.routineSteps.reduce((sum, step) => 
    sum + step.products.reduce((s, p) => s + p.price, 0), 0
  );
}
    async exportPdf(): Promise<void> {
    this.pdfGenerating = true;
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const teal   = [26, 122, 110] as [number, number, number];
      const ink    = [20, 20, 18]   as [number, number, number];
      const grey   = [74, 74, 70]   as [number, number, number];
      const lgrey  = [232, 232, 229] as [number, number, number];

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

      let y = 67;

      this.routineSteps.forEach((step, idx) => {
        // Step header
        doc.setFillColor(...teal);
        doc.roundedRect(20, y - 5, 170, 8, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${step.step}  ${step.label}`, 25, y + 1);
        y += 12;

        step.products.forEach(p => {
          doc.setTextColor(...ink);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(`${p.brand} — ${p.name}`, 25, y);
          y += 6;

          doc.setTextColor(...grey);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');

          const desc = p.description ?? '';
          const lines = doc.splitTextToSize(desc.substring(0, 180), 160);
          doc.text(lines, 25, y);
          y += lines.length * 4.5 + 2;

          doc.setTextColor(...teal);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(`€${p.price}`, 25, y);
          y += 10;
        });

        if (idx < this.routineSteps.length - 1) {
          doc.setDrawColor(...lgrey);
          doc.line(20, y, 190, y);
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

      doc.save(`pharmagrid-routine-${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
    }
    this.pdfGenerating = false;
  }

  retakeQuiz(): void {
    this.router.navigate(['/'], { fragment: 'routine-builder' });
  }
}