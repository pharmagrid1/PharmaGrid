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

 placeOrder() {
  if (this.checkoutForm.invalid) return;

  const formValue = this.checkoutForm.value;

  const orderPayload = {
    user_id: 1, // temporary
    delivery_method: formValue.deliveryMethod,
    total_amount: this.cartService.getTotal(),
    items: this.cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }))
  };

  this.orderService.createOrder(orderPayload).subscribe({
    next: (createdOrder) => {
      this.cartService.clearCart();
      this.router.navigate(['/order-confirmation'], {
        state: { order: createdOrder }
      });
    },
    error: (err) => {
      console.error('Order creation failed', err);
    }
  });
}
}
