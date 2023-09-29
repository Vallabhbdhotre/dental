import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUmListingComponent } from './admin-um-listing.component';

describe('AdminUmListingComponent', () => {
  let component: AdminUmListingComponent;
  let fixture: ComponentFixture<AdminUmListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUmListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUmListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
