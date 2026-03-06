import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn = false;
  userName = '';
  isAdmin = false;
  searchQuery = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.full_name?.split(' ')[0] || '';
      this.isAdmin = user?.role === 'admin';
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/products'], {
        queryParams: { search: query }
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}