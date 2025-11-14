import { Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Producto } from '../../interfaces/producto.interface';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-productos-list',
  imports: [CommonModule, CardModule],
  templateUrl: './card-productos-list.html',
  styleUrl: './card-productos-list.css',
})
export class CardProductosList {
  @Input() producto!: Producto;

  router = inject(Router);
  productosService = inject(ProductosService)

    verProducto(producto:Producto) {
      console.log('Producto seleccionado:', producto);
      this.router.navigate(['/productos/detail-producto', producto.id_producto]);
  }
}
