import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../product.service';

@Component({
  selector: 'app-products-page',
  imports: [CommonModule],
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
