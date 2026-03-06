import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//import { ToastService, Toast } from '../services/toast.service';
import * as toastService from '../services/toast.service';


@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {

  toasts: toastService.Toast[] = [];

  constructor(private toastService: toastService.ToastService){
    this.toastService.toasts.subscribe(t => this.toasts = t);
  }
  dismiss(id: number) {
    this.toastService.dismiss(id);
  }

}
