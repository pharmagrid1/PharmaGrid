import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';
import { BehaviorSubject } from 'rxjs';

// export interface OrderItem {
//   product_id: number;
//   productName: string;
//   quantity: number;
//   price: number;
// }

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone:string;
  address:string;
  deliveryMethod:string;
  items:CartItem[];
  total: number;
  status: OrderStatus;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private orders: Order[] = [];
    private ordersSubject = new BehaviorSubject<Order[]>([]);

    orders$ = this.ordersSubject.asObservable();

    createOrder(order: Order) {
      this.orders.push(order);
      this.ordersSubject.next(this.orders);
    }

    getAllOrders(): Order[] {
      return this.orders;
    }

    updateStatus(id: string, status: OrderStatus) {
      const order = this.orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        this.ordersSubject.next(this.orders);
      }
    }
}