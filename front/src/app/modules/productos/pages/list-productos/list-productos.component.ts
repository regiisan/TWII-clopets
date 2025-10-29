import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CardProductosList } from '../../../productos/components/card-productos-list/card-productos-list';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-list-productos',
  imports: [Toast, TableModule, CardModule, CommonModule, CardProductosList, ToastModule],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css',
  providers : [MessageService]
})

export class ListProductosComponent implements OnInit, OnDestroy {

  productos: Producto[] = [];
  productoService = inject(ProductosService);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.listarProductos();
}

ngOnDestroy(): void {
}

listarProductos(){

  this.productoService.listProductos().subscribe({
    next : (productos:Producto[])=>{
      this.productos = productos;
      console.log(this.productos);
    },
    error : ()=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al cargar los productos'});
    },
    complete : ()=>{
    }
  }
)
}
}
