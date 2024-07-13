import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerbookingComponent } from './ownerbooking.component';

describe('OwnerbookingComponent', () => {
  let component: OwnerbookingComponent;
  let fixture: ComponentFixture<OwnerbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerbookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
