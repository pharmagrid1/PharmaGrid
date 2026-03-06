import {Routes} from '@angular/router';
import {Layout} from './layout/layout/layout';
import {ProductsPage} from './features/products/pages/products-page/products-page';
import {ProductDetail } from './features/products/pages/product-detail/product-detail';
import {CartPage } from './features/cart/cart-page/cart-page';
import { MyOrders } from './pages/my-orders/my-orders';
import { authGuard } from './shared/guards/auth.guard';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { Home } from './pages/home/home';
import { adminGuard } from './shared/guards/admin.guard';

import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '', component: Home
      },
      {
        path: 'products', component:ProductsPage
      },
      {
        path: 'product/:id', component: ProductDetail
      },
      {
        path: 'cart', component: CartPage
      },
      {
        path:'checkout',canActivate:[authGuard], loadComponent:()=>
          import('./features/checkout/checkout-page/checkout-page').then(m=>m.CheckoutPage)
      },
      {
        path:'order-confirmation', loadComponent:()=>
          import('./features/order/order-confirmation-page/order-confirmation-page')
        .then(m=>m.OrderConfirmationPage)
      },
      {
        path: 'my-orders',canActivate:[authGuard], component: MyOrders
      },
      {
        path:'login', component: Login 
         
      },
      {
        path:'register', component: Register
      },
      {
        path:'admin',
        component:Admin,
        canActivate: [adminGuard]
      },
    ]
  }
];