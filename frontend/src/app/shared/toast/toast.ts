import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Toast service + type definitions
import * as toastService from '../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {

  toasts: toastService.Toast[] = []; // Active toast list

  constructor(private toastService: toastService.ToastService) {
    // Subscribe to toast stream
    this.toastService.toasts.subscribe(t => this.toasts = t);
  }

  // Remove toast by id
  dismiss(id: number) {
    this.toastService.dismiss(id);
  }
}