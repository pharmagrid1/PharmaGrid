import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule, MatToolbarModule, RouterLinkActive, CommonModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn=false;
  userName='';

  constructor(private auth: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user=>{
      this.isLoggedIn=!!user;
      this.userName=user?.full_name?.split(' ')[0] || '';

    });
  }

  logout(): void{
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
