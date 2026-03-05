import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule, MatToolbarModule, RouterLinkActive, CommonModule, ɵInternalFormsSharedModule, FormsModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn=false;
  userName='';
  searchQuery='';

  constructor(private auth: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user=>{
      this.isLoggedIn=!!user;
      this.userName=user?.full_name?.split(' ')[0] || '';

    });
  }

  onSearch(): void{
    if(this.searchQuery.trim()){
      this.router.navigate(['/products'],{
        queryParams:{search: this.searchQuery.trim()}
      });
    }
  }

  logout(): void{
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
