import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {

  activeTab = 'products';
  products: any[] = [];
  orders: any[] = [];
  loading = false;

  private apiUrl = 'http://localhost:5000/api/admin';

  orderStatuses = [
    'Pending',
    'Confirmed',
    'Processiing',
    'Ready for Pickup',
    'Out for Delivery ',
    'Delivered',
    'Cancelled',
    'Rejected',
  ];

  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers() {
    return new HttpHeaders({Authorization: 'Bearer ${this.auth.getToken()}'});
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.http.get<any[]>(`${this.apiUrl}/products`, {headers: this.headers})
    .subscribe(data => this.products = data);
  }

  loadOrders(): void {
    this.http.get<any[]>(`${this.apiUrl}/orders`, {headers: this.headers})
    .subscribe(data => this.orders = data);
  }
  
  deactivateProduct(id: number): void {
    this.http.patch(`${this.apiUrl}/products/${id}/deactivate`, {},  {headers: this.headers})
    .subscribe(data => this.loadProducts());
  }
  activateProduct(id: number): void {
    this.http.put(`${this.apiUrl}/products/${id}`, {is_active: true},  {headers: this.headers})
    .subscribe(data => this.loadProducts());
  }
  updateOrderStatus(orderId: string, status: string): void {
    this.http.patch(`${this.apiUrl}/products/${orderId}/status`, {status},  {headers: this.headers})
    .subscribe(data => this.loadOrders());
  }
}