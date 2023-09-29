import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInwardListComponent } from './stock-inward-list.component';

describe('StockInwardListComponent', () => {
  let component: StockInwardListComponent;
  let fixture: ComponentFixture<StockInwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
