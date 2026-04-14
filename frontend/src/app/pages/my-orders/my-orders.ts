import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Core Angular features
import { CommonModule } from '@angular/common'; // Common directives
import { RouterLink } from '@angular/router'; // Router link directive
import { OrderService } from '../../shared/services/order.service'; // Orders API service
import { AuthService } from '../../shared/services/auth.service'; // Auth service
import { MatIconModule } from '@angular/material/icon'; // Material icons
import { MatExpansionModule } from '@angular/material/expansion'; // Expandable panels
import { MatChipsModule } from '@angular/material/chips'; // Status chips
import { MatDividerModule } from '@angular/material/divider'; // UI divider

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.scss']
})
export class MyOrders implements OnInit {
  orders: any[] = []; // User orders list
  loading = true; // Loading state

  constructor(
    private orderService: OrderService, // Service to fetch orders
    private auth: AuthService, // Auth context
    private cdr: ChangeDetectorRef // Manual change detection
  ) {}

  ngOnInit(): void {
    this.fetchOrders(); // Load orders on init
  }

  fetchOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data: any[]) => {
        this.orders = this.sortOrders(data); // Sort by date
        this.loading = false; // Stop loading
        this.cdr.detectChanges(); // Refresh UI
      },
      error: (err) => {
        console.error('Failed to load orders', err); // Log error
        this.loading = false; // Stop loading on error
        this.cdr.detectChanges(); // Refresh UI
      }
    });
  }

  sortOrders(data: any[]): any[] {
    return data.sort((a, b) =>
      new Date(b.created_at ?? 0).getTime() - // Newest first
      new Date(a.created_at ?? 0).getTime()
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending': return 'warn'; // Yellow/warning
      case 'Confirmed': return 'primary'; // Primary color
      case 'Processing': return 'accent'; // Accent color
      case 'Delivered': return 'primary'; // Success state
      case 'Cancelled': return ''; // Default/no color
      default: return ''; // Fallback
    }
  }

  getTimelineSteps(status: string) {
    const steps = [
      { label: 'Pending', icon: '🕐' }, // Step 1
      { label: 'Confirmed', icon: '✅' }, // Step 2
      { label: 'Processing', icon: '⚙️' }, // Step 3
      { label: 'Delivered', icon: '📦' }, // Step 4
    ];

    const order = ['Pending', 'Confirmed', 'Processing', 'Delivered']; // Status flow
    const currentIndex = order.indexOf(status); // Find current step

    return steps.map((step, i) => ({
      ...step,
      completed: i < currentIndex, // Past steps
      current: i === currentIndex // Active step
    }));
  }
}