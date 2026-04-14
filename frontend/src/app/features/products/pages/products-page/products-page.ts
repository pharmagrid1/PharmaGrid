import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class ProductsPage implements OnInit {

  products: Product[] = []; // All products
  filteredProducts: Product[] = []; // Filtered results

  selectedSkinType = '';
  selectedBrand = '';
  selectedCategory = '';
  searchQuery = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  loading = true; // Loading state

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Read query params for filters
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
      this.selectedBrand = params['brand'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    // Apply all active filters
    this.filteredProducts = this.products.filter(product => {
      const matchesSkin = !this.selectedSkinType || product.skin_type === this.selectedSkinType;
      const matchesBrand = !this.selectedBrand || product.brand === this.selectedBrand;
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesSearch = !this.searchQuery ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesMin = !this.minPrice || product.price >= this.minPrice;
      const matchesMax = !this.maxPrice || product.price <= this.maxPrice;

      return matchesSkin && matchesBrand && matchesCategory && matchesSearch && matchesMin && matchesMax;
    });
  }

  filterBySkinType(event: any): void {
    this.selectedSkinType = event.target.value; // Update skin filter
    this.applyFilters();
  }

  filterByBrand(event: any): void {
    this.selectedBrand = event.target.value; // Update brand filter
    this.applyFilters();
  }

  clearFilters(): void {
    // Reset all filters
    this.selectedSkinType = '';
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.searchQuery = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredProducts = [...this.products];
  }
}