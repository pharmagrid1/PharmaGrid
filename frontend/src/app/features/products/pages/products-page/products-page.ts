import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../product.service';
import { ProductCard } from '../../../../shared/product-card/product-card';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-products-page',
  imports: [CommonModule, ProductCard, MatAnchor],
  standalone: true,
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit{
  products : Product[]=[];

  filteredProducts: Product[]=[];
  selectedSkinType='';
  selectedBrand='';
  

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products=data;
      this.filteredProducts=data;
    });
  }
    
    
    filterBySkinType(event:any){
      this.selectedSkinType=event.target.value;
      this.applyFilters();
    }
    

    filterByBrand(event: any){
      this.selectedBrand=event.target.value;
      this.applyFilters();
    }

    clearFilters(){
      this.selectedSkinType='';
      this.selectedBrand='';
      this.filteredProducts=this.products;
    }

    applyFilters(){
      this.filteredProducts=this.products.filter(product=>{
        const matchesSkin=
          !this.selectedSkinType||
          product.skinType===this.selectedSkinType;

        const matchesBrand=
          !this.selectedBrand||
          product.brand===this.selectedBrand;

        return matchesSkin && matchesBrand;
      });
    }
}
