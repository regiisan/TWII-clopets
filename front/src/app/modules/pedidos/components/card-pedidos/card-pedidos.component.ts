import { Component, Input } from '@angular/core';
import { ProductosPedidoComponent } from "../productos-pedido/productos-pedido.component";
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-pedidos',
  imports: [CommonModule ,ProductosPedidoComponent, CurrencyPipe, DatePipe],
  templateUrl: './card-pedidos.component.html',
  styleUrl: './card-pedidos.component.css',
})
export class CardPedidosComponent {
  @Input() pedido: any;
}
