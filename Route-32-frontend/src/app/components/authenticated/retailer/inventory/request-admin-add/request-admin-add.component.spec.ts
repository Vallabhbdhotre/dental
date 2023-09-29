import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdminAddComponent } from './request-admin-add.component';

describe('RequestAdminAddComponent', () => {
  let component: RequestAdminAddComponent;
  let fixture: ComponentFixture<RequestAdminAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdminAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
