import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Producto } from '../../interfaces/producto.interface';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-card-productos-list',
  imports: [CommonModule, CardModule],
  templateUrl: './card-productos-list.html',
  styleUrl: './card-productos-list.css',
})
export class CardProductosList {
  @Input() producto!: Producto;
}
