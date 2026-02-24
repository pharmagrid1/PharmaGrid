import {Routes} from '@angular/router';
import {Layout} from './layout/layout/layout';
import {ProductsPage} from './features/products/pages/products-page/products-page';
import { ProductDetail } from './features/products/pages/product-detail/product-detail';

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
    ]
  }
];