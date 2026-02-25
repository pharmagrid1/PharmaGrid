import {Injectable} from '@angular/core';
import { CartItem } from './cart.service';

export interface Order{
    id:string;
    customerName:string;
    email:string;
    phone:string;
    address:string;
    deliveryMethod:string;
    items:CartItem[];
    total:number;
    status:string;
}

@Injectable({
    providedIn:'root'
})

export class OrderService{
    private currentOrder: Order | null=null;

    createdOrder(order:Order){
        this.currentOrder=order;
    }

    getOrder(): Order | null {
        return this.currentOrder;
    }

    getMyOrders(): Observable<Order[]>{
        return this.http.get<Order[]>('${this.apiUrl}/my-orders');
    }

    clearOrder(){
        this.currentOrder=null;
    }
}