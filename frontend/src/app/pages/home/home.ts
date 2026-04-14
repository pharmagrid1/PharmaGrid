import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core'; // Core Angular features
import { Router, RouterLink } from "@angular/router"; // Routing utilities
import { ProductCard } from "../../shared/product-card/product-card"; // Product card component (unused here)
import { CommonModule } from '@angular/common'; // Common directives
import { FormsModule } from '@angular/forms'; // Form bindings
import { Product, ProductService } from '../../features/products/product.service'; // Product data service
import { CartService } from '../../shared/services/cart.service'; // Cart management
import { AuthService } from '../../shared/services/auth.service'; // Auth state
import { HttpClient } from '@angular/common/http'; // HTTP client
import { ToastService } from '../../shared/services/toast.service'; // Toast notifications
import { environment } from '../../../environments/environment'; // Env config

export interface QuizStep{
  label:string;
  question:string;
  options:{label:string; value:string; icon:string}[]; // Possible answers
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy{

  isAdmin=false; // Admin flag
  isLoggedIn=false; // Auth flag
  isScrolled=false; // Header scroll state

  @HostListener('window: scroll')
  onScroll():void{
    this.isScrolled=window.scrollY>20; // Detect page scroll
  }

  featuredProducts: Product[]=[]; // Homepage featured products
  featuredLoading=true; // Loading state
  featuredError=false; // Error state

  trustItems=[ // Trust bar items
    { icon: ' ⚕️', label: 'Dermatologist-Approved', sub: 'Every product verified' },
    { icon: '🧴', label: '50+ Products', sub: 'Across 8 expert brands' },
    { icon: ' 🌿', label: 'Science-Backed', sub: 'Clinically tested formulas' },
    { icon: '🚚', label: 'Fast Delivery', sub: 'Dispatched within 24 hours' },
  ];

  brands=[ // Brand showcase tiles
    { name: 'Bioderma', slug: 'Bioderma', origin: 'France' },
    { name: 'Avène', slug: 'Avène', origin: 'France' },
    { name: 'TirTir', slug: 'TirTir', origin: 'Korea' },
    { name: 'Medicube', slug: 'Medicube', origin: 'Korea' },
    { name: 'Purito', slug: 'Purito', origin: 'Korea' },
    { name: 'Geek & Gorgeous', slug: 'Geek & Gorgeous', origin: 'Hungary' },
    { name: 'Mary & May', slug: 'Mary & May', origin: 'Korea' },
    { name: 'Biodance', slug: 'Biodance', origin: 'Korea' },
  ];

  activeBrand: string | null =null; // Selected brand filter

  filterByBrand(slug: string):void{
    this.activeBrand=this.activeBrand===slug? null : slug; // Toggle brand
  }

  quizStep=0; // Current quiz step
  quizAnswers: Record<number, string>={}; // Selected answers
  quizComplete=false; // Quiz completion flag

  quizSteps: QuizStep[]=[ // Quiz questions
    {
      label:'Skin Type',
      question:'How would you describe your skin type?',
      options:[
        { label: 'Dry', value: 'dry', icon: '🏜️' },
        { label: 'Oily', value: 'oily', icon: '💧' },
        { label: 'Combination', value: 'combination', icon: '🧼' },
        { label: 'Sensitive', value: 'sensitive', icon: '🌸' },
      ],
    },
    {
      label:'Concern',
      question:'What is your primary skin concern?',
      options:[
        { label: 'Acne & Pores', value: 'acne', icon: '🔎' },
        { label: 'Hydration', value: 'hydration', icon: '💦' },
        { label: 'Anti-Aging', value: 'aging', icon: '⌛️' },
        { label: 'Brightening', value: 'brightening', icon: '✨' },
      ],
    },
    {
      label:'Routine',
      question: 'How involved is your ideal routine?',
      options:[
        { label: 'Minimal (2–3 steps)', value: 'minimal', icon: '⚡️' },
        { label: 'Standard (4–5 steps)', value: 'standard', icon: '🌿' },
        { label: 'Full (6+ steps)', value: 'full', icon: '🧖‍♀️' },
        { label: 'Morning only', value: 'morning', icon: '☀️' },
      ],
    },
  ];

  selectAnswer(value:string): void {
    this.quizAnswers[this.quizStep]=value; // Save answer
  }

  nextStep():void{
    if(!this.quizAnswers[this.quizStep]) return; // Require answer
    if(this.quizStep < this.quizSteps.length - 1) {
      this.quizStep++;
    } else {
      this.router.navigate(['/routine-result'], {
        state: {answers: this.quizAnswers} // Pass answers
      });
    }
  }

  prevStep(): void{
    if(this.quizStep>0) this.quizStep--; // Go back
  }

  resetQuiz(): void{
    this.quizStep=0;
    this.quizAnswers={};
    this.quizComplete=false; // Reset quiz
  }

  whyItems=[ // Value proposition cards
    { num: '01', title: 'Expert Curation', body:'Every product is hand-selected by dermatologists and skincare specialists. No fillers, no gimmicks -only formulas that work.'},
    { num: '02', title:'Science-Backed', body:'We partner exclusively with brands that publish clinical data. You will always know what is in your routine and why it works.'},
    { num:'03', title: 'Built for Your Skin', body: 'Our routine builder matches products to your skin type, concern, and lifestyle — so every recommendation is personal.' },
  ];

  newsletterEmail=''; // Newsletter input
  newsletterSubmitted=false; // Submission flag

  submitNewsletter(): void {
    if (!this.newsletterEmail.trim().includes('@')) return; // Basic validation
    this.http.post(`${environment.apiUrl}/api/newsletter/subscribe`, {
      email: this.newsletterEmail
    }).subscribe({
      next: () => {
        this.newsletterSubmitted = true;
        this.newsletterEmail = '';
      },
      error: () => {
        this.newsletterSubmitted = true;
      }
    });
  }

  constructor(
    private productService: ProductService, // Fetch products
    private cartService: CartService, // Cart actions
    private auth: AuthService, // Auth state
    private http: HttpClient, // HTTP client
    private cdr: ChangeDetectorRef, // Change detection
    private toast: ToastService, // Toast feedback
    private router: Router // Navigation
  ) {}

  ngOnInit(): void {
    this.isScrolled=window.scrollY>20; // Init scroll state

    this.auth.currentUser$.subscribe(user =>{
      this.isLoggedIn=!!user;
      this.isAdmin=user?.role==='admin';
      this.cdr.detectChanges();
    });

    this.productService.getProducts().subscribe({
      next: data =>{
        this.featuredProducts=data.slice(0,4); // Take first 4
        this.featuredLoading=false;
        this.cdr.detectChanges();
      },
      error: ()=>{
        this.featuredError=true;
        this.featuredLoading=false;
      },
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  scrollToQuiz(): void {
    document.getElementById('routine-builder')?.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
  }

  addToCart(product: Product): void{
    this.cartService.addToCart({
      id:product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    this.toast.show(`${product.name} added to cart`, 'success'); // Feedback
  }
}