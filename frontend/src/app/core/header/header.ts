import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule], // Needed modules
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn = false; // Auth state
  userName = ''; // First name display
  isAdmin = false; // Role flag
  searchQuery = ''; // Search model
  menuOpen = false;  // Mobile menu state

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Track current user
    this.auth.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.full_name?.split(' ')[0] || '';
      this.isAdmin = user?.role === 'admin';
    });
  }

  // Toggle mobile menu open/closed
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Close menu when a link is clicked
  closeMenu(): void {
    this.menuOpen = false;
  }

  onSearch(): void {
    const query = this.searchQuery.trim(); // Clean input
    if (query.length >= 2 || query.length === 0) {
      // Navigate with search query
      this.router.navigate(['/products'], {
        queryParams: { search: query || null }
      });
      this.closeMenu();
    }
  }

  logout(): void {
    this.auth.logout(); // Clear session
    this.router.navigate(['/']); // Redirect home
    this.closeMenu();
  }
}