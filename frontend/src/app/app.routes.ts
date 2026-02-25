import {Routes} from '@angular/router';
import {Layout} from './layout/layout/layout';
import {ProductsPage} from './features/products/pages/products-page/products-page';
import {ProductDetail } from './features/products/pages/product-detail/product-detail';
import {CartPage } from './features/cart/cart-page/cart-page';
import { MyOrders } from './pages/my-orders/my-orders';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '', component: ProductsPage
      },
      {
        path: 'product/:id', component: ProductDetail
      },
      {
        path: 'cart', component: CartPage
      },
      {
        path:'checkout', loadComponent:()=>
          import('./features/checkout/checkout-page/checkout-page').then(m=>m.CheckoutPage)
      },
      {
        path:'order-confirmation', loadComponent:()=>
          import('./features/order/order-confirmation-page/order-confirmation-page')
        .then(m=>m.OrderConfirmationPage)
      },
      {
        path: 'my-orders', component: MyOrders
      }
    ]
  }
];