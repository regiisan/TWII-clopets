import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPedidoComponent } from './productos-pedido.component';

describe('ProductosPedido', () => {
  let component: ProductosPedidoComponent;
  let fixture: ComponentFixture<ProductosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
