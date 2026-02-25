import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService , CartItem} from '../../../shared/services/cart.service';
import { OrderService, Order } from '../../../shared/services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-page',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage {

  checkoutForm;
  cartItems:CartItem[]=[];

  constructor(
    private fb: FormBuilder,
    private cartService:CartService,
    private orderService: OrderService,
    private router: Router
  ){

  this.checkoutForm=this.fb.group({
    customerName:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    phone:['',Validators.required],
    address:['', Validators.required],
    deliveryMethod:['Pickup', Validators.required]
  });

 this.cartService.cart$.subscribe(items=>{
  this.cartItems=items;
 });
    
  }

  placeOrder(){
    if(this.checkoutForm.invalid) return;

    const formValue=this.checkoutForm.value;

    const newOrder: Order={
      id:'ORD-'+Math.floor(Math.random()*100000),
      customerName:formValue.customerName?? '',
      email:formValue.email?? '',
      phone: formValue.phone?? '',
      address:formValue.address?? '',
      deliveryMethod:formValue.deliveryMethod?? 'Pickup',
      items:this.cartItems,
      total: this.cartService.getTotal(),
      status:'Pending'
    };

    this.orderService.createdOrder(newOrder);
    
    this.cartService.clearCart();

    this.router.navigate(['/order-confirmation']);
  }
}
