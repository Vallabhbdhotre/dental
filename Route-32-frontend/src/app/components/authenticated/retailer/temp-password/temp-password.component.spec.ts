import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempPasswordComponent } from './temp-password.component';

describe('TempPasswordComponent', () => {
  let component: TempPasswordComponent;
  let fixture: ComponentFixture<TempPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
