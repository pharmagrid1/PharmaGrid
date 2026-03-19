import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('pharmagrid_cart');
    if (stored) {
      this.cartItems = JSON.parse(stored);
      this.cartSubject.next(this.cartItems);
    }
  }

  private save(): void {
    localStorage.setItem('pharmagrid_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  addToCart(product: CartItem) {
    const existing = this.cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push(product);
    }
    this.save();
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.save();
  }

  increaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) item.quantity++;
    this.save();
  }

  decreaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) item.quantity--;
    this.save();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('pharmagrid_cart');
    this.cartSubject.next([]);
  }
}