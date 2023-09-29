import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRetailerAddComponent } from './sub-retailer-add.component';

describe('SubRetailerAddComponent', () => {
  let component: SubRetailerAddComponent;
  let fixture: ComponentFixture<SubRetailerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRetailerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubRetailerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
