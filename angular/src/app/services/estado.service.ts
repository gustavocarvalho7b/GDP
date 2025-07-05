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
}
