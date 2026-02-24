import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../product.service';
import { ProductCard } from '../../../../shared/product-card/product-card';

@Component({
  selector: 'app-products-page',
  imports: [CommonModule, ProductCard],
  standalone: true,
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit{
  products : Product[]=[];

  

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
    });
  }

}
