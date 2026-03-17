import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService, Product } from '../../product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { ProductCard } from '../../../../shared/product-card/product-card';

export interface Review{
  id:number;
  user_id:number;
  full_name:string;
  rating:number;
  comment:string;
  created_at:string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ProductCard
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  error = false;
  quantity = 1;

  //Reviews

  reviews: Review[]=[];
  isLoggedIn=false;
  newRating=0;
  hoverRating=0;
  newComment='';
  reviewSubmitting=false;
  reviewSuccess=false;
  reviewError='';

  private apiUrl='http://localhost:5000/api';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user=>{
      this.isLoggedIn=!!user;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.cdr.detectChanges();
          this.loadRelated(data.category, data.id);
          this.loadReviews(data.id);
                },
        error: (err) => {
          console.error('Failed to load product', err);
          this.error = true;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.error = true;
    }
  }

  //Reviews
  loadReviews(productId:number):void{
    this.http.get<Review[]> (`${this.apiUrl}/products/${productId}/reviews`)
    .subscribe({
      next:data =>{
        this.reviews=data;
        this.cdr.detectChanges();
      },
      error:()=>{}
    });
  }

  setRating(value:number) :void{this.newRating=value;}
  setHover(value:number): void{this.hoverRating=value;}
  clearHover():void {this.hoverRating=0;}

  submitReview():void{
    if(!this.product || this.newRating===0) return;
    this.reviewSubmitting=true;
    this.reviewError='';

    const token=this.auth.getToken();
    const headers=new HttpHeaders({Authorization:`Bearer ${token}`});

    this.http.post(
      `${this.apiUrl}/products/${this.product.id}/reviews`,
      {rating:this.newRating, comment: this.newComment},
      {headers}
    ).subscribe({
      next: ()=>{
        this.reviewSuccess = true;
        this.reviewSubmitting = false;
        this.newRating = 0;
        this.newComment = '';
        this.loadReviews(this.product!.id);
        setTimeout(()=>{this.reviewSuccess=false; this.cdr.detectChanges();}, 3000);
         this.cdr.detectChanges();
      },
      error: (err)=>{
        this.reviewError=err.error?.message || 'Failed to submit review.';
        this.reviewSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }


  averageRating(): number{
    if(!this.reviews.length) return 0;
    return this.reviews.reduce((sum, r)=> sum+r.rating, 0)/this.reviews.length;
  }

   getStarType(star: number, rating: number): string {
    if (rating >= star) return '★';
    if (rating >= star - 0.5) return '½';
    return '☆';
  }

  increase(): void {
    if (this.product && this.quantity < this.product.stock) this.quantity++;
  }

  decrease(): void {
    if (this.quantity > 1) this.quantity--;
  }

  loadRelated(category: string, excludeId: number): void {
    this.productService.getProducts().subscribe(all => {
      this.relatedProducts = all
        .filter(p => p.category === category && p.id !== excludeId)
        .slice(0, 3);
      this.cdr.detectChanges();
    });
  }

  addToCart(): void {
    if (!this.product) return;
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      brand: this.product.brand,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.image
    });
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push('full');
      else if (rating >= i - 0.5) stars.push('half');
      else stars.push('empty');
    }
    return stars;
  }
}