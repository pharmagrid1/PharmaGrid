import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../shared/services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart-page',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit {
  
  cartItems: CartItem[] = []; // Current cart items

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increase(id:number) {
    this.cartService.increaseQuantity(id); // Increase quantity
  }
  
  decrease(id:number) {
    this.cartService.decreaseQuantity(id); // Decrease quantity
  }

  remove(id:number) {
    this.cartService.removeFromCart(id); // Remove item
  }

  getTotal(){
    return this.cartService.getTotal(); // Calculate total
  }
}