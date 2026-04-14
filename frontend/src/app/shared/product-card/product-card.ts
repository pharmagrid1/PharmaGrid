import { Component, Input } from '@angular/core'; // Core Angular features
import { MatCardModule } from '@angular/material/card'; // Material card UI
import { MatButtonModule } from '@angular/material/button'; // Material buttons
import { MatChipsModule } from '@angular/material/chips'; // Material chips
import { RouterModule } from '@angular/router'; // Router links
import { CartService } from '../services/cart.service'; // Cart logic
import { ToastService } from '../services/toast.service'; // Toast notifications

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  @Input() id!: number; // Product ID
  @Input() brand!: string; // Product brand
  @Input() name!: string; // Product name
  @Input() price!: number; // Product price
  @Input() skinType!: string; // Skin type label
  @Input() image!: string; // Product image URL
  @Input() stock: number = 0; // Stock count
  @Input() rating: number = 0; // Product rating

  fallbackImage = 'https://placehold.co/400x400/111827/2dd4bf?text=No+Image'; // Default image

  constructor(
    private cartService: CartService, // Cart service injection
    private toast: ToastService // Toast service injection
  ) {}

  onImageError(event: any) {
    event.target.src = this.fallbackImage; // Fallback on image error
  }

  addToCart() {
    this.cartService.addToCart({
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      quantity: 1,
      image: this.image
    }); // Add product to cart

    this.toast.show(`${this.name} added to cart`, 'success'); // Success message
  }

  getStars(rating: number): string[] {
    const stars = []; // Star array builder

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push('full'); // Full star
      else if (rating >= i - 0.5) stars.push('half'); // Half star
      else stars.push('empty'); // Empty star
    }

    return stars; // Return star rating
  }
}