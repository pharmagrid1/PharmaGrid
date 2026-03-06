import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface OrderItem {
  product_id: number;
  product_name?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  user_id?: number;
  delivery_method: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient, private auth: AuthService) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getMyOrders(): Observable<any[]> {
    const userId = this.auth.getCurrentUser()?.id;
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}