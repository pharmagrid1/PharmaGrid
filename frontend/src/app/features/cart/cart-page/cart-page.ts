import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone:true,
  imports: [],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit {
  
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService){}


  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increase(id:number) {
    this.cartService.increaseQuantity(id);
  }
  
  decrease(id:number) {
    this.cartService.decreaseQuantity(id);
  }

  remove(id:number) {
    this.cartService.removeFromCart(id);
  }

  getTotal(){
    return this.cartService.getTotal();
  }

}
