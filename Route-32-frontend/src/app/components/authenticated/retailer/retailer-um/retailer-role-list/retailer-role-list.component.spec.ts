import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRoleListComponent } from './retailer-role-list.component';

describe('RetailerRoleListComponent', () => {
  let component: RetailerRoleListComponent;
  let fixture: ComponentFixture<RetailerRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRoleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
