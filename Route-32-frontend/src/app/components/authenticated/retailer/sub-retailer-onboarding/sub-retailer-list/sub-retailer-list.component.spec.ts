import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRetailerListComponent } from './sub-retailer-list.component';

describe('SubRetailerListComponent', () => {
  let component: SubRetailerListComponent;
  let fixture: ComponentFixture<SubRetailerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRetailerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubRetailerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
