import { TestBed } from '@angular/core/testing';

import { PublicidadeEstadoService } from './publicidade-estado.service';

describe('PublicidadeEstadoService', () => {
  let service: PublicidadeEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicidadeEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
