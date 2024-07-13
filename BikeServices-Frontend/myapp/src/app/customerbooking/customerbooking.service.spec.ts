import { TestBed } from '@angular/core/testing';

import { CustomerbookingService } from './customerbooking.service';

describe('CustomerbookingService', () => {
  let service: CustomerbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
