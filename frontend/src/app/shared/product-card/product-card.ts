import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,MatChipsModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() id!: number;
  @Input() brand! : string;
  @Input() name! : string;
  @Input() price! : number;
  @Input() skinType! : string;
  @Input() image! : string;
  fallbackImage='https://placehold.co/400x400/111827/2dd4bf?text=No+Image';
  @Input() stock: number=0;

  onImageError(event: any){
    event.target.src=this.fallbackImage;
  }

  constructor(private cartService: CartService, private toast: ToastService) {};

  addToCart(){
    this.cartService.addToCart({
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      quantity: 1,
      image: this.image
    });

    this.toast.show(`${this.name} added to cart ✓`);
  }


  
}
