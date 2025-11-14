import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../../../api/services/pedidos/interfaces/pedido.interface';
import { PedidosService } from '../../../../api/services/pedidos/pedidos.service';
import { MessageService } from 'primeng/api';
import { Producto } from '../../../productos/interfaces/producto.interface';
import { CardPedidosComponent } from "../../components/card-pedidos/card-pedidos.component";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { Spinner } from '../../../../shared/spinner/spinner';

@Component({
  selector: 'app-list-pedidos',
  standalone: true, 
  imports: [CommonModule, CardPedidosComponent, ProgressSpinnerModule, Spinner],
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css'],
  providers: [MessageService],
})
export class ListPedidosComponent implements OnInit, OnDestroy {
  @Input() producto!: Producto;

  private pedidosService = inject(PedidosService);
  private messageService = inject(MessageService);
  pedidos: Pedido[] = [];
  id_usuario!: number;
  spinner = true;

  ngOnInit(): void {
    const userData = localStorage.getItem('auth_user');

    if (userData) {
      const user = JSON.parse(userData);
      this.id_usuario = user.id_usuario; 
    } else {
      console.error('No hay usuario logueado en storage');
      return;
    }
    this.listarPedidos();
  }

  ngOnDestroy(): void {}

  listarPedidos(): void {
    this.pedidosService.listPedidos(this.id_usuario).subscribe({
      next: (pedidos: any[]) => {
        this.pedidos = pedidos.map((p) => ({
          ...p,
          productos: p.pedido_producto,
        }));
        console.log('Pedidos cargados:', this.pedidos);
      },
      error: (err) => {
        console.error('Error al cargar pedidos', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los pedidos',
        });
      }, complete: () => {
        this.spinner = false;
      }
    });
  }
}
