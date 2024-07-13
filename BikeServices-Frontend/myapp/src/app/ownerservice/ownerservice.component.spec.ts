import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerserviceComponent } from './ownerservice.component';

describe('OwnerserviceComponent', () => {
  let component: OwnerserviceComponent;
  let fixture: ComponentFixture<OwnerserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
