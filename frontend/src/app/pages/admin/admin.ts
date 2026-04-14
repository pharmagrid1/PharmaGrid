import { CommonModule } from '@angular/common'; // Common Angular directives
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HTTP utilities
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'; // Core Angular features
import { FormsModule } from '@angular/forms'; // Template form support
import { AuthService } from '../../shared/services/auth.service'; // Auth/token service
import { environment } from '../../../environments/environment'; // Env config

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  activeTab = 'products'; // Current active tab
  products: any[] = []; // Product list
  orders: any[] = []; // Order list
  pendingCount = 0; // Pending orders badge count

  private apiUrl = `${environment.apiUrl}/api/admin`; // Base admin API URL

  orderStatuses = [
    'Pending',
    'Confirmed',
    'Processing',
    'Ready for Pickup',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Rejected',
  ]; // Allowed order status values

  constructor(
    private http: HttpClient, // HTTP client
    private auth: AuthService, // Auth service for token
    private cdr: ChangeDetectorRef // Manual change detection
  ) {}

  get headers() {
    // Attach auth token to every request
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  ngOnInit(): void {
    // Initial data load
    this.loadProducts();
    this.loadOrders();
    this.loadPendingCount();
  }

  loadProducts(): void {
    // Fetch all products
    this.http.get<any>(`${this.apiUrl}/products`, { headers: this.headers })
      .subscribe({
        next: data => {
          this.products = data.products;
          this.cdr.detectChanges(); // Refresh UI
        },
        error: err => console.error('loadProducts failed:', err)
      });
  }

  loadOrders(): void {
    // Fetch all orders
    this.http.get<any>(`${this.apiUrl}/orders`, { headers: this.headers })
      .subscribe({
        next: data => {
          this.orders = data.orders;
          this.cdr.detectChanges(); // Refresh UI
        },
        error: err => console.error('loadOrders failed:', err)
      });
  }

  loadPendingCount(): void {
    // Fetch pending orders count
    this.http.get<any>(`${this.apiUrl}/orders/pending-count`, { headers: this.headers })
      .subscribe({
        next: data => {
          this.pendingCount = data.count;
          this.cdr.detectChanges(); // Refresh UI
        },
        error: err => console.error('loadPendingCount failed:', err)
      });
  }

  deactivateProduct(id: number): void {
    // Mark product as inactive
    this.http.patch(`${this.apiUrl}/products/${id}/deactivate`, {}, { headers: this.headers })
      .subscribe(() => this.loadProducts());
  }

  activateProduct(id: number): void {
    // Mark product as active
    this.http.patch(`${this.apiUrl}/products/${id}/activate`, {}, { headers: this.headers })
      .subscribe(() => this.loadProducts());
  }

  updateOrderStatus(orderId: string, status: string): void {
    // Update order status
    this.http.patch(`${this.apiUrl}/orders/${orderId}/status`, { status }, { headers: this.headers })
      .subscribe(() => this.loadOrders());
  }
}