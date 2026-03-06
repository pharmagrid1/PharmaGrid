import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderService } from '../../shared/services/order.service';

/* Angular Material */
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    RouterLink
],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.scss']
})
export class MyOrders implements OnInit {

  orders: Order[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data.sort((a: any, b: any) =>
          new Date(b.created_at ?? b.createdAt ?? 0).getTime() -
          new Date(a.created_at ?? a.createdAt ?? 0).getTime()
        );
        this.loading = false;
      },
      error: () => {
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