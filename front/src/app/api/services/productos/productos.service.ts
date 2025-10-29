import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../../modules/productos/interfaces/producto.interface';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  http = inject(HttpClient);

  constructor() {}

  listProductos() {
    return this.http.get<Producto[]>(`${environment.api_url}/producto`);
  }
}
