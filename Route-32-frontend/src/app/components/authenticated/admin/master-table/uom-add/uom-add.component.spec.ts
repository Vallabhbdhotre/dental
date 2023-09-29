import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomAddComponent } from './uom-add.component';

describe('UomAddComponent', () => {
  let component: UomAddComponent;
  let fixture: ComponentFixture<UomAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
