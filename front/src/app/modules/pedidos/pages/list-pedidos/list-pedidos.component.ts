import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../../../api/services/pedidos/interfaces/pedido.interface';
import { PedidosService } from '../../../../api/services/pedidos/pedidos.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../../productos/interfaces/producto.interface';

@Component({
  selector: 'app-list-pedidos',
  imports: [CommonModule],
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css'],
  providers: [MessageService],
})
export class ListPedidosComponent implements OnInit, OnDestroy {
  @Input() producto!: Producto;

  private pedidosService = inject(PedidosService);
  private messageService = inject(MessageService);
  pedidos: Pedido[] = [];
  id_usuario = 1;

  ngOnInit(): void {
    this.listarPedidos();
  }

  ngOnDestroy(): void {}

  listarPedidos(): void {
    this.pedidosService.listPedidos(this.id_usuario).subscribe({
      next: (pedidos: any[]) => {
        this.pedidos = pedidos.map(p => ({
          ...p,
          productos: p.pedido_producto
        }));
        console.log('Pedidos cargados:', this.pedidos);
      },
      error: (err) => {
        console.error('Error al cargar pedidos', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los pedidos' });
      }
    });
  }
}
