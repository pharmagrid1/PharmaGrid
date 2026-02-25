import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.service';

export interface OrderItem {
  product_id: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  deliveryMethod: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  // CREATE ORDER (checkout)
  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  // GET USER ORDERS
  getMyOrders(): Observable<Order[]> {
    const userId = 1; // temporary hardcoded
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }
}