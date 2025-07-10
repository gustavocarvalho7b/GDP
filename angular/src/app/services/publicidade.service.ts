import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicidade } from '../models/publicidade';

@Injectable({
  providedIn: 'root',
})
export class PublicidadeService {
  private url: string = '/api/cad_publicidades';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<Publicidade[]> {
    return this.http.get<Publicidade[]>(this.url);
  }
  criarPublicidade(payload: any): Observable<any> {
    return this.http.post(`${this.url}`, payload);
  }
  atualizarPublicidade(id: number, publicidade: any) {
    return this.http.put(`${this.url}/${id}`, { cad_publicidade: publicidade });
  }
  excluirPublicidade(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
