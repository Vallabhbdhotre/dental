import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInventoryComponent } from './business-inventory.component';

describe('BusinessInventoryComponent', () => {
  let component: BusinessInventoryComponent;
  let fixture: ComponentFixture<BusinessInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
