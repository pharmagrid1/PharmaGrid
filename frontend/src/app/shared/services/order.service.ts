import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

// Order item model
export interface OrderItem {
  product_id: number;
  product_name?: string;
  quantity: number;
  price: number;
}

// Order model
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
  private apiUrl = `${environment.apiUrl}/api/orders`; // API endpoint

  constructor(private http: HttpClient, private auth: AuthService) {}

  // Create new order
  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  // Get orders for current user
  getMyOrders(): Observable<any[]> {
    const user = this.auth.getCurrentUser(); // Auth user
    const stored = localStorage.getItem('pharmagrid_user'); // Backup user
    const userId = user?.id ?? (stored ? JSON.parse(stored).id : null);

    // Return empty observable if no user
    if (!userId) return new Observable(obs => { obs.next([]); obs.complete(); });

    const token = this.auth.getToken(); // Auth token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    // Fetch user orders
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }
}