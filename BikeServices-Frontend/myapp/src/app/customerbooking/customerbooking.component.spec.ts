import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerbookingComponent } from './customerbooking.component';

describe('CustomerbookingComponent', () => {
  let component: CustomerbookingComponent;
  let fixture: ComponentFixture<CustomerbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerbookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
