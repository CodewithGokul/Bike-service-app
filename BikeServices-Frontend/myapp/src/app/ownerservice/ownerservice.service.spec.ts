import { TestBed } from '@angular/core/testing';

import { OwnerserviceService } from './ownerservice.service';

describe('OwnerserviceService', () => {
  let service: OwnerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
