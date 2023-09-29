import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdminListComponent } from './request-admin-list.component';

describe('RequestAdminListComponent', () => {
  let component: RequestAdminListComponent;
  let fixture: ComponentFixture<RequestAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdminListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
