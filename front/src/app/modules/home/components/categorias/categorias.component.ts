import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  imports: [CardModule, CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {

}
