import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductosComponent } from './detail-productos.component';

describe('DetailProductos', () => {
  let component: DetailProductosComponent;
  let fixture: ComponentFixture<DetailProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
