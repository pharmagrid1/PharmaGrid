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

@Injectable ({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);

    cart$ = this.cartSubject.asObservable();

    addToCart(product: CartItem) {
        const existingItem = this.cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cartItems.push(product);
        }
        this.cartSubject.next(this.cartItems);
    }

    removeFromCart(id: number) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.cartSubject.next(this.cartItems);
    }

    increaseQuantity(id:number) {
        const item = this.cartItems.find(item => item.id === id);
        if(item) item.quantity++;
        this.cartSubject.next(this.cartItems);
    }

    decreaseQuantity(id:number) {
        const item = this.cartItems.find(item => item.id === id);
        if(item && item.quantity > 1) {
            item.quantity--;
        }
        this.cartSubject.next(this.cartItems);
    }

    getTotal(): number {
        return this.cartItems.reduce((total, item) =>
            total + item.price * item.quantity, 0 );
    }
}