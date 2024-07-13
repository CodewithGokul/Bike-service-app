import { TestBed } from '@angular/core/testing';

import { AllserviceService } from './allservice.service';

describe('AllserviceService', () => {
  let service: AllserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
