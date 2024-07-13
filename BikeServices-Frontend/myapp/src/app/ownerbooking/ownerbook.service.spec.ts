import { TestBed } from '@angular/core/testing';

import { OwnerbookService } from './ownerbook.service';

describe('OwnerbookService', () => {
  let service: OwnerbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
