import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUmRoleAddComponent } from './admin-um-role-add.component';

describe('AdminUmRoleAddComponent', () => {
  let component: AdminUmRoleAddComponent;
  let fixture: ComponentFixture<AdminUmRoleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUmRoleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUmRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
