// src/app/api/services/pedidos/pedidos.service.ts
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
  private baseUrl = environment.api_url;

  constructor() { }

  listPedidos(id_usuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/pedido`, {
      params: { id_usuario: id_usuario.toString() }
    });
  }

  crearPedido(body: { id_usuario: number; direccion_envio: string }): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/pedido`, body);
  }
}
