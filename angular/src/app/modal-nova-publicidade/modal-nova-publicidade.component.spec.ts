import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovaPublicidadeComponent } from './modal-nova-publicidade.component';

describe('ModalNovaPublicidadeComponent', () => {
  let component: ModalNovaPublicidadeComponent;
  let fixture: ComponentFixture<ModalNovaPublicidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNovaPublicidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNovaPublicidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
