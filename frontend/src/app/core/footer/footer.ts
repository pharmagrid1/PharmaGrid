import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer  implements OnInit{
  currentYear=new Date().getFullYear();
  newsletterEmail='';
  newsletterSubmitted=false;
  isAdmin = false;
  isLoggedIn = false;
  
  
  constructor(private auth: AuthService,  private http: HttpClient,  ){}

ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.isAdmin = user?.role === 'admin';
      this.isLoggedIn = !!user;
    });
  }


 submitNewsletter(): void {
  if (!this.newsletterEmail.trim().includes('@')) return;
  this.http.post(`${environment.apiUrl}/api/newsletter/subscribe`, {
    email: this.newsletterEmail
  }).subscribe({
    next: () => {
      this.newsletterSubmitted = true;
      this.newsletterEmail = '';
    },
    error: () => {
      this.newsletterSubmitted = true;
    }
  });
}
}
