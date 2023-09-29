import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUmAddComponent } from './admin-um-add.component';

describe('AdminUmAddComponent', () => {
  let component: AdminUmAddComponent;
  let fixture: ComponentFixture<AdminUmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUmAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
