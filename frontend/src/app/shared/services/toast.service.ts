import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Toast notification model
export interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private toasts$ = new BehaviorSubject<Toast[]>([]); // Toast state stream
    toasts = this.toasts$.asObservable(); // Public observable
    private counter = 0; // Unique ID generator

    // Show new toast
    show(message: string, type: 'success' | 'error' | 'info' = 'success'){
        const id = this.counter++; // Assign ID
        const current = this.toasts$.value; // Current list
        this.toasts$.next([...current, {id, message, type}]); // Add toast

        // Auto dismiss after 3s
        setTimeout(() => this.dismiss(id), 3000)
    }

    // Remove toast by ID
    dismiss(id:number) {
        this.toasts$.next(this.toasts$.value.filter(t => t.id !== id));
    }
}