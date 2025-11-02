// src/app/app.component.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header"; 
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,                             // 👈 faltaba
  imports: [RouterOutlet, Header, Footer],              // quitá componentes que se rutean
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']            // 👈 plural
})
export class App {
  protected readonly title = signal('front');
}
