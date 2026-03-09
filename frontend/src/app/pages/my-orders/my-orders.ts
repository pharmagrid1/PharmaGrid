import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { filter, switchMap, take } from 'rxjs/operators';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.scss']
})
export class MyOrders implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.pipe(
      filter(user => !!user),  // wait until user is not null
      take(1),                  // only take the first valid emission
      switchMap(() => this.orderService.getMyOrders())
    ).subscribe({
      next: (data: any[]) => {
        this.orders = data.sort((a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending': return 'warn';
      case 'Confirmed': return 'primary';
      case 'Processing': return 'accent';
      case 'Delivered': return 'primary';
      case 'Cancelled': return '';
      default: return '';
    }
  }
}