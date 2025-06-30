import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicidade } from '../models/publicidade';
import { Estados } from '../models/estados';
import { PublicidadeEstado } from '../models/publicidadeEstado';

@Injectable({
  providedIn: 'root',
})
export class PublicidadeService {
  private url: string = '/api/cad_publicidades';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<Publicidade[]> {
    return this.http.get<Publicidade[]>(this.url);
  }
}

export class EstadoService {
  private url: string = '/api/cad_estados';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<Estados[]> {
    return this.http.get<Estados[]>(this.url);
  }
}

export class PublicidadeEstadoService {
  private url = '/api/publicidade_estado';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<PublicidadeEstado[]> {
    return this.http.get<PublicidadeEstado[]>(this.url);
  }
}
