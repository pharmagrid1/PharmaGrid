import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/header/header";
import { Toast } from "./shared/toast/toast";
import { Footer } from "./core/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Toast, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
