import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatTabsModule, 
    MatDividerModule, 
    MatProgressSpinnerModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit{
  product:any=null;

  constructor(
    private route:ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ){}

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.productService.getProductById(+id).subscribe({
        next: (data) =>  this.product=data,
        error: (err) => console.error('Product fetch failed', err)
    });
    }
  }

  addToCart(){
    if(this.product){
      this.cartService.addToCart({
        id: this.product.id,
        name:this.product.name,
        brand: this.product.brand,
        price: this.product.price,
        quantity:1,
        image: this.product.image
      });
    }
  }
}
