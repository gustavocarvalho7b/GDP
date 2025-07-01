import { Injectable } from '@angular/core';
import { PublicidadeEstado } from '../models/publicidadeEstado';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicidadeEstadoService {
  private url = '/api/publicidade_estado';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<PublicidadeEstado[]> {
    return this.http.get<PublicidadeEstado[]>(this.url);
  }
}
