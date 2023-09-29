import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRequestsListComponent } from './retailer-requests-list.component';

describe('RetailerRequestsListComponent', () => {
  let component: RetailerRequestsListComponent;
  let fixture: ComponentFixture<RetailerRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRequestsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
