import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule, MatToolbarModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
