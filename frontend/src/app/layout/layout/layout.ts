import { Component } from '@angular/core';
import { Header } from "../../core/header/header";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../core/footer/footer";

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, Footer],
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
