import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-confirmation-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation-page.html',
  styleUrl: './order-confirmation-page.scss',
})
export class OrderConfirmationPage {

  order: Order | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras.state?.['order'] || null;
  }
}