import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


export interface OrderItem{
  product_id: number;
  productName?:string;
  quantity:number;
  price:number;
}

export interface Order{
   id?:string;
   user_id?:number;
   customerName?:string;
   email?:string;
   phone?:string;
   address?:string;
   delivery_method:string;
   deliveryMethod?:string;
   items:OrderItem[];
   total_amount:number;
   totalAmount?:number;
   status:string;
   createdAt?:string;
   created_at?:string;
}

@Injectable({ providedIn:'root'})
export class OrderService{
  private apiUrl='http://localhost:5000/api/orders';

  constructor(private http: HttpClient, private auth: AuthService){}

  createOrder(order:any): Observable<Order>{
    return this.http.post<Order>(this.apiUrl, order);
  }

  getMyOrders(): Observable<any[]>{
    const userId=this.auth.getCurrentUser()?.id;
    return this.http.get<any[]>(`http://localhost:5000/api/orders/user/${userId}`);
  }
}