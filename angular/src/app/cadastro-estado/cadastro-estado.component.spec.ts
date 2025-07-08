import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEstadoComponent } from './cadastro-estado.component';

describe('CadastroEstadoComponent', () => {
  let component: CadastroEstadoComponent;
  let fixture: ComponentFixture<CadastroEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
