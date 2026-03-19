import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  activeTab = 'products';
  products: any[] = [];
  orders: any[] = [];
  pendingCount=0;

private apiUrl = `${environment.apiUrl}/api/admin`;

  orderStatuses = [
    'Pending',
    'Confirmed',
    'Processing',
    'Ready for Pickup',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Rejected',
  ];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  get headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
    this.loadPendingCount();
  }

loadProducts(): void {
  this.http.get<any>(`${this.apiUrl}/products`, { headers: this.headers })
    .subscribe({
      next: data => {
        this.products = data.products;
        this.cdr.detectChanges();
      },
      error: err => console.error('loadProducts failed:', err)
    });
}

loadOrders(): void {
  this.http.get<any>(`${this.apiUrl}/orders`, { headers: this.headers })
    .subscribe({
      next: data => {
        this.orders = data.orders;
        this.cdr.detectChanges();
      },
      error: err => console.error('loadOrders failed:', err)
    });
}

loadPendingCount(): void {
  this.http.get<any>(`${this.apiUrl}/orders/pending-count`, { headers: this.headers })
    .subscribe({
      next: data => {
        this.pendingCount = data.count;
        this.cdr.detectChanges();
      },
      error: err => console.error('loadPendingCount failed:', err)
    });
}
  deactivateProduct(id: number): void {
    this.http.patch(`${this.apiUrl}/products/${id}/deactivate`, {}, { headers: this.headers })
      .subscribe(() => this.loadProducts());
  }

  activateProduct(id: number): void {
    this.http.patch(`${this.apiUrl}/products/${id}/activate`, {}, { headers: this.headers })
      .subscribe(() => this.loadProducts());
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.http.patch(`${this.apiUrl}/orders/${orderId}/status`, { status }, { headers: this.headers })
      .subscribe(() => this.loadOrders());
  }


  
}
