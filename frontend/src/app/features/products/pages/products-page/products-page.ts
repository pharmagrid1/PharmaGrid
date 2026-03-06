import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../product.service';
import { ProductCard } from '../../../../shared/product-card/product-card';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [CommonModule, ProductCard, FormsModule],
  standalone: true,
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage implements OnInit{
  products : Product[]=[];
  filteredProducts: Product[]=[];
  selectedSkinType='';
  selectedBrand='';
  selectedCategory='';
  searchQuery='';
  minPrice: number | null=null;
  maxPrice: number | null=null;

  loading = true;  

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery=params['search'] || '';
      this.selectedCategory=params['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void{
    this.loading = true;
    this.productService.getProducts().subscribe(data =>{
      this.products= data;
      this.applyFilters();
      this.loading = false;
    });
  }
    

  applyFilters(): void {
    this.filteredProducts=this.products.filter(product=>{
      const matchesSkin=!this.selectedSkinType || product.skin_type=== this.selectedSkinType;
      const matchesBrand=!this.selectedBrand || product.brand===this.selectedBrand;
      const matchesCategory=!this.selectedCategory || product.category=== this.selectedCategory;
      const matchesSearch=!this.searchQuery ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesMin=!this.minPrice || product.price >= this.minPrice;
      const matchesMax=!this.maxPrice || product.price<= this.maxPrice;
      return matchesSkin && matchesBrand && matchesCategory && matchesSearch && matchesMin && matchesMax;

    });
  }
    
    filterBySkinType(event:any):void {
      this.selectedSkinType=event.target.value;
      this.applyFilters();
    }
    

    filterByBrand(event: any):void {
      this.selectedBrand=event.target.value;
      this.applyFilters();
    }

    clearFilters():void {
      this.selectedSkinType='';
      this.selectedBrand='';
      this.selectedCategory='';
      this.searchQuery='';
      this.minPrice=null;
      this.maxPrice=null;
      this.filteredProducts=this.products;
    }

    
}
