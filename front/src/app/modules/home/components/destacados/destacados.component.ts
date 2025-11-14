import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../../productos/interfaces/producto.interface';
import { CardProductosList } from "../../../productos/components/card-productos-list/card-productos-list";
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-destacados',
   standalone: true,
  imports: [CommonModule, CarouselModule, CardProductosList, CurrencyPipe, CardModule],
  templateUrl: './destacados.component.html',
  styleUrl: './destacados.component.css',
})
export class DestacadosComponent implements OnInit {

  productosDestacados: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados() {
    // ⚠️ Cambia por tu endpoint real (ej: /productos/destacados)
    this.productosService.getProductosHome().subscribe({
      next: (data) => {
        console.log('Datos cargados:', this.productosDestacados[0]);
        this.productosDestacados = data.items.slice(0, 8);
      },
      error: (err) => console.log(err),
    });
  }
}
