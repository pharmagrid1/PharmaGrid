import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  let userId = this.auth.getCurrentUser()?.id;
  console.log('getCurrentUser result:', this.auth.getCurrentUser());
  console.log('userId:', userId);
  
  if (!userId) {
    const stored = localStorage.getItem('pharmagrid_user');
    if (stored) userId = JSON.parse(stored).id;
    console.log('userId from localStorage:', userId);
  }

  if (!userId) return new Observable(obs => { obs.next([]); obs.complete(); });
  
  return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
}
}