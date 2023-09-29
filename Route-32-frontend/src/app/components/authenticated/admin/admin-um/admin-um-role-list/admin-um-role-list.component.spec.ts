import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUmRoleListComponent } from './admin-um-role-list.component';

describe('AdminUmRoleListComponent', () => {
  let component: AdminUmRoleListComponent;
  let fixture: ComponentFixture<AdminUmRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUmRoleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUmRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
