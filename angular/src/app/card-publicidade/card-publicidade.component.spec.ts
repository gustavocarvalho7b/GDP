import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPublicidadeComponent } from './card-publicidade.component';

describe('CardPublicidadeComponent', () => {
  let component: CardPublicidadeComponent;
  let fixture: ComponentFixture<CardPublicidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPublicidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPublicidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
