import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Pedido } from './interfaces/pedido.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private http = inject(HttpClient);

  constructor() { }

  listPedidos(id_usuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.api_url}/pedido`, {
      params: { id_usuario: id_usuario.toString() }
    });
  }
}
