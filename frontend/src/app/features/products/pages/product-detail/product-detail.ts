import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductCard } from '../../../../shared/product-card/product-card';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.cdr.detectChanges();
          this.loadRelated(data.category, data.id);
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

     this.toast.show(`${this.product.name} added to cart`, 'success');
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