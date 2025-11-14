import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-pedido',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './productos-pedido.component.html',
  styleUrl: './productos-pedido.component.css',
})
export class ProductosPedidoComponent {
 @Input() producto: any;
}
