import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  @Input() rating: number = 0; //0-5 supports decimals
  @Input() count: number = 0; //nr of reviews
  @Input() showCount = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';


  get starArray(){
    return Array.from({ length: 5}, (_,i) => ({
      index: i,
      filled: this.rating >= i + 1,
      half: this.rating > i && this.rating < i + 1,
    }));
  } 
}