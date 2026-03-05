import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../features/products/product.service';
import { RouterLink } from "@angular/router";
import { ProductCard } from "../../shared/product-card/product-card";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  featuredProducts: Product[] = [];

  categories = [
    { label: 'Cleansers', icon: '🧴', value: 'Cleanser' },
    { label: 'Moisturizers', icon: '💧', value: 'Moisturizer' },
    { label: 'Sunscreen', icon: '☀️', value: 'Sunscreen' },
    { label: 'Serums', icon: '✨', value: 'Serum' },
    { label: 'Treatments', icon: '🩺', value: 'Treatment' },
    { label: 'Makeup', icon: '💄', value: 'Makeup' },
  ];

  constructor(private productService: ProductService) {}
 
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.featuredProducts = data.slice(0, 4);
    });
  }

}
