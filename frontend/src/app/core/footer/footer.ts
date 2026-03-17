import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear=new Date().getFullYear();
  newsletterEmail='';
  newsletterSubmitted=false;
   isAdmin = false;

   constructor(private auth: AuthService,  private http: HttpClient,  ){}

   ngOnInit(){
      this.auth.currentUser$.subscribe(user=>{
        this.isAdmin=user?.role==='admin'
      })
   }

  submitNewsletter(): void {
  if (!this.newsletterEmail.trim().includes('@')) return;
  this.http.post('http://localhost:5000/api/newsletter/subscribe', {
    email: this.newsletterEmail
  }).subscribe({
    next: () => {
      this.newsletterSubmitted = true;
      this.newsletterEmail = '';
    },
    error: () => {
      this.newsletterSubmitted = true; // still show success to user
    }
  });
}
}
