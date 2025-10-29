import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListProductosComponent } from "./modules/productos/pages/list-productos/list-productos.component";
import { CardProductosList } from './modules/productos/components/card-productos-list/card-productos-list';
import { Header } from "./shared/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListProductosComponent, Header, CardProductosList],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('front');
}
