import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductCard } from '../../../../shared/product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ProductCard,
    RouterLink
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) =>  {
        this.product = data;
        this.loadRelated(data.category, data.id);
      },
        error: (err) => console.error('Failed to load product', err)
      });
    }
  }
  
  quantity = 1;

    increase():void{
      if (this.product && this.quantity < this.product.stock){
        this.quantity ++;
      }
    }
  
    decrease(): void{
      if (this.quantity > 1) this.quantity--;
    }

  loadRelated(category:string, excludeId:number): void{
    this.productService.getProducts().subscribe(all=>{
      this.relatedProducts=all.filter(p=>p.category === category && p.id !== excludeId)
      .slice(0, 3);
    });
  }
  addToCart(): void {
    if (!this.product) return;
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      brand: this.product.brand,
      price: this.product.price,
      quantity: 1,
      image: this.product.image
    });
  }

  getStars(rating: number): string[]{
    const stars=[];
    for (let i=1; i<=5; i++){
      if(rating>=i) stars.push('full');
      else if(rating >= i-0.5) stars.push('half');
      else stars.push('empty');
    }
    return stars;
  }
  
}