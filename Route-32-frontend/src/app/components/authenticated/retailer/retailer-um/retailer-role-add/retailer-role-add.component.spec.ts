import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRoleAddComponent } from './retailer-role-add.component';

describe('RetailerRoleAddComponent', () => {
  let component: RetailerRoleAddComponent;
  let fixture: ComponentFixture<RetailerRoleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRoleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
