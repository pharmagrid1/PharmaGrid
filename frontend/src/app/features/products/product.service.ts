import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

// Product data model
export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  skin_type: string;
  skin_concern: string;
  category: string;
  image: string;
  description: string;
  ingredients: string;
  usage_instructions: string;
  warnings: string;
  stock: number;
  is_active: boolean;
  rating?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`; // API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Fetch single product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}