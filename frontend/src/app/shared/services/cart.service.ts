import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// Cart item model
export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = []; // Local cart state
  private cartSubject = new BehaviorSubject<CartItem[]>([]); // Reactive stream
  cart$ = this.cartSubject.asObservable(); // Public observable

  constructor() {
    // Load cart from localStorage
    const stored = localStorage.getItem('pharmagrid_cart');
    if (stored) {
      this.cartItems = JSON.parse(stored);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Save cart to storage + emit updates
  private save(): void {
    localStorage.setItem('pharmagrid_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  // Add item or increase quantity
  addToCart(product: CartItem) {
    const existing = this.cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push(product);
    }
    this.save();
  }

  // Remove item completely
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.save();
  }

  // Increase quantity
  increaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) item.quantity++;
    this.save();
  }

  // Decrease quantity (min 1)
  decreaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) item.quantity--;
    this.save();
  }

  // Calculate total price
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('pharmagrid_cart');
    this.cartSubject.next([]);
  }
}