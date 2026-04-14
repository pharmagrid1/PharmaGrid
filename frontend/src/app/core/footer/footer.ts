import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule], // Required Angular modules
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  currentYear = new Date().getFullYear(); // Dynamic year
  newsletterEmail = ''; // Email model
  newsletterSubmitted = false; // Submission state
  isAdmin = false; // Role flag
  isLoggedIn = false; // Auth flag

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    // Listen to auth state changes
    this.auth.currentUser$.subscribe(user => {
      this.isAdmin = user?.role === 'admin';
      this.isLoggedIn = !!user;
    });
  }

  submitNewsletter(): void {
    // Basic email validation
    if (!this.newsletterEmail.trim().includes('@')) return;

    // Send email to backend
    this.http.post(`${environment.apiUrl}/api/newsletter/subscribe`, {
      email: this.newsletterEmail
    }).subscribe({
      next: () => {
        this.newsletterSubmitted = true; // Show success state
        this.newsletterEmail = ''; // Clear input
      },
      error: () => {
        this.newsletterSubmitted = true; // Still show success UI
      }
    });
  }
}