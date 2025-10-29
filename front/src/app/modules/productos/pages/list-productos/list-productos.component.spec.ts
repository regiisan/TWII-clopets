import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductosComponent } from './list-productos.component';

describe('ListProductosComponent', () => {
  let component: ListProductosComponent;
  let fixture: ComponentFixture<ListProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
