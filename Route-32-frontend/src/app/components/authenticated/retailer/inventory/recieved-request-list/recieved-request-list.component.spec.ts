import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedRequestListComponent } from './recieved-request-list.component';

describe('RecievedRequestListComponent', () => {
  let component: RecievedRequestListComponent;
  let fixture: ComponentFixture<RecievedRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievedRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecievedRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
