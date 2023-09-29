import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOutwardListComponent } from './stock-outward-list.component';

describe('StockOutwardListComponent', () => {
  let component: StockOutwardListComponent;
  let fixture: ComponentFixture<StockOutwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockOutwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockOutwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
