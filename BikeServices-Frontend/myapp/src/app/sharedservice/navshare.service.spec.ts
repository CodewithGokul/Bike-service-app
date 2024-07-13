import { TestBed } from '@angular/core/testing';

import { NavshareService } from './navshare.service';

describe('NavshareService', () => {
  let service: NavshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
