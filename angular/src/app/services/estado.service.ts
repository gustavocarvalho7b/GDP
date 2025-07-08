import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estados } from '../models/estados';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private url: string = '/api/cad_estados';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<Estados[]> {
    return this.http.get<Estados[]>(this.url);
  }
  criarEstado(payload: any): Observable<any> {
    return this.http.post(`${this.url}`, payload);
  }
  atualizarEstado(id: number, publicidade: any) {
    return this.http.put(`${this.url}/${id}`, publicidade);
  }
  excluirEstado(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
