import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../../home/components/hero/hero.component';
import { CategoriasComponent } from '../../components/categorias/categorias.component';
import { DestacadosComponent } from '../../../home/components/destacados/destacados.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroComponent, CategoriasComponent, DestacadosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
