import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order, OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-confirmation-page',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './order-confirmation-page.html',
  styleUrl: './order-confirmation-page.scss',
})
export class OrderConfirmationPage {
  order: Order |null;

  constructor(private orderService:OrderService){
    this.order=this.orderService.getOrder();
  }
}
