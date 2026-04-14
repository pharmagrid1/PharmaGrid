import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {

  @Input() rating: number = 0; // Rating value (0–5, supports decimals)
  @Input() count: number = 0; // Number of reviews
  @Input() showCount = true; // Toggle review count display
  @Input() size: 'sm' | 'md' | 'lg' = 'md'; // Star size variant

  // Generate 5-star structure with fill/half logic
  get starArray() {
    return Array.from({ length: 5 }, (_, i) => ({
      index: i,
      filled: this.rating >= i + 1, // Full star
      half: this.rating > i && this.rating < i + 1, // Half star
    }));
  }
}