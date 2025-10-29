import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductosList } from './card-productos-list';

describe('CardProductosList', () => {
  let component: CardProductosList;
  let fixture: ComponentFixture<CardProductosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProductosList],
    }).compileComponents();

    fixture = TestBed.createComponent(CardProductosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
