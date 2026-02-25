import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  product = {
    brand: 'La Roche-Posay',
    name: 'Effaclar Cleanser',
    price: 18,
    skinType: 'Oily Skin',
    description: 'Foaming gel cleanser for oily and acne-prone skin.',
    ingredients: 'Aqua, Glycerin, Zinc PCA...',
    usage: 'Apply morning and evening to wet skin.',
    warnings: 'Avoid contact with eyes.'
  };
}
