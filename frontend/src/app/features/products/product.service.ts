import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Product{
   
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
  warnings:string;
  stock:number;
  is_active:boolean;
}

@Injectable({
    providedIn:'root'
})

export class ProductService{
    private apiUrl='http://localhost:5000/api/products';

    constructor(private http:HttpClient){}

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.apiUrl);
    }

    
  getProductById(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}