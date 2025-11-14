import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-detail-productos',
  imports: [RouterLink, CardModule, CommonModule, AccordionModule, GalleriaModule],
  templateUrl: './detail-productos.component.html',
  styleUrl: './detail-productos.component.css',
})
export class DetailProductosComponent implements OnInit, OnDestroy {
  productoService = inject(ProductosService);
  activatedRouter = inject(ActivatedRoute);
  id: number | null = null;
  producto: Producto | undefined;
  talles: any[] = [];
  openPanel: string | null = 'devoluciones'; 

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.verProducto();
    this.verTalles();
  }

  ngOnDestroy(): void {}

  verProducto() {
    this.productoService.verProducto(this.id!).subscribe({
      next: (data) => {
        this.producto = data;
        console.log(data);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  verTalles() {
    this.productoService.getTalles(this.id!).subscribe({
      next: (data) => {
        this.talles = data;
        console.log('Talles:', data);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  toggleAccordion(panelName: string): void {
    if (this.openPanel === panelName) {
      this.openPanel = null;
    } else {
      this.openPanel = panelName;
    }
  }

}
