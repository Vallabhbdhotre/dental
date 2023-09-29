import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerUmAddComponent } from './retailer-um-add.component';

describe('RetailerUmAddComponent', () => {
  let component: RetailerUmAddComponent;
  let fixture: ComponentFixture<RetailerUmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerUmAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerUmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
