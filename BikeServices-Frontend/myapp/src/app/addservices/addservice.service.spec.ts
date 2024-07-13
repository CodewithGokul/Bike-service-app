import { TestBed } from '@angular/core/testing';

import { AddserviceService } from './addservice.service';

describe('AddserviceService', () => {
  let service: AddserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
