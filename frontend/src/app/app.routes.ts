import {Routes} from '@angular/router';
import {Layout} from './layout/layout/layout';
import {ProductsPage} from './features/products/pages/products-page/products-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '', component: ProductsPage
      }
    ]
  }
];