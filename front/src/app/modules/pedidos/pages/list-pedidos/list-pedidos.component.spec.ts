import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPedidosComponent } from './list-pedidos.component';

describe('ListPedidos', () => {
  let component: ListPedidosComponent;
  let fixture: ComponentFixture<ListPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
