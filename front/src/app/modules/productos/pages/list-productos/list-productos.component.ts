// src/app/modules/productos/pages/list-productos/list-productos.component.ts
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import {
  ProductosService,
  ProductosResponse,
} from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { CardProductosList } from '../../../productos/components/card-productos-list/card-productos-list';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Spinner } from '../../../../shared/spinner/spinner';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Spinner,
    Toast,
    TableModule,
    CardModule,
    CommonModule,
    CardProductosList,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css',
  providers: [MessageService],
})
export class ListProductosComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductosService);
  private messageService = inject(MessageService);

  spinner = true;

  productos: Producto[] = [];
  total = 0;
  loading = false;

  openFilters = false;

  animals: string[] = [];
  clasifs: string[] = [];
  priceMinMax = { min: 0, max: 0 };
  private facetsLoaded = false; 

  page = 1;
  pageSize = 12;

  form = this.fb.group({
    q: [''],
    precioMin: [null as number | null],
    precioMax: [null as number | null],
    animal: [[] as string[]],
    clasificacion: [[] as string[]],
    sort: ['newest' as 'newest' | 'price_asc' | 'price_desc'],
  });

  ngOnInit(): void {
    this.listarProductos();

    this.form.valueChanges.subscribe(() => {
      this.page = 1;
      this.listarProductos();
    });
  }

  ngOnDestroy(): void {}

  toggleFilters() {
    this.openFilters = !this.openFilters;
  }

  listarProductos() {
    this.loading = true;
    const v = this.form.value;

    this.productoService
      .getProductos({
        q: v.q || undefined,
        clasificacion: v.clasificacion || undefined,
        animal: v.animal || undefined,
        precioMin: v.precioMin ?? undefined,
        precioMax: v.precioMax ?? undefined,
        sort: v.sort || 'newest',
        page: this.page,
        pageSize: this.pageSize,
      })
      .subscribe({
        next: (res: ProductosResponse) => {
          this.productos = res.items;
          this.total = res.total;
          this.loading = false;

          if (!this.facetsLoaded) {
            this.actualizarFacetasDesdeProductos(res.items);
            this.facetsLoaded = true;
          }
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los productos',
          });
        },
      });
  }

  private actualizarFacetasDesdeProductos(items: Producto[]) {
    const animalsSet = new Set<string>();
    const clasifSet = new Set<string>();
    let min = Number.POSITIVE_INFINITY;
    let max = 0;

    for (const p of items) {
      if (p.animal) animalsSet.add(p.animal);
      if (p.clasificacion) clasifSet.add(p.clasificacion);
      if (p.precio != null) {
        if (p.precio < min) min = p.precio;
        if (p.precio > max) max = p.precio;
      }
    }

    this.animals = Array.from(animalsSet);
    this.clasifs = Array.from(clasifSet);
    this.priceMinMax = {
      min: min === Number.POSITIVE_INFINITY ? 0 : min,
      max,
    };
  }

  toggleCheck(list: 'animal' | 'clasificacion', val: string, checked: boolean) {
    const arr = [...(this.form.value[list] || [])];
    const exists = arr.includes(val);
    const next = checked
      ? exists
        ? arr
        : [...arr, val]
      : arr.filter((x) => x !== val);

    this.form.patchValue({ [list]: next });
  }

  resetFilters() {
    this.form.reset({
      q: '',
      precioMin: null,
      precioMax: null,
      animal: [],
      clasificacion: [],
      sort: 'newest',
    });
    this.page = 1;
    this.listarProductos();
  }
}
