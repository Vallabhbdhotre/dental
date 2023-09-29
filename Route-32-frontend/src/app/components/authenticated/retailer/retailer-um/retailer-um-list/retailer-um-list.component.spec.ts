import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerUmListComponent } from './retailer-um-list.component';

describe('RetailerUmListComponent', () => {
  let component: RetailerUmListComponent;
  let fixture: ComponentFixture<RetailerUmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerUmListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerUmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
