import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPedidosComponent } from './card-pedidos.component';

describe('CardPedidos', () => {
  let component: CardPedidosComponent;
  let fixture: ComponentFixture<CardPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
