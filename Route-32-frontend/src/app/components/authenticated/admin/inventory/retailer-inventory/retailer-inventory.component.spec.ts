import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerInventoryComponent } from './retailer-inventory.component';

describe('RetailerInventoryComponent', () => {
  let component: RetailerInventoryComponent;
  let fixture: ComponentFixture<RetailerInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
