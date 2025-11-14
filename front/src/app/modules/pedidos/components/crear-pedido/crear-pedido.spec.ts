import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPedido } from './crear-pedido';

describe('CrearPedido', () => {
  let component: CrearPedido;
  let fixture: ComponentFixture<CrearPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
