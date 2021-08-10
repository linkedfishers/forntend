import { TestBed } from '@angular/core/testing';

import { WeathrserviceService } from './weathrservice.service';

describe('WeathrserviceService', () => {
  let service: WeathrserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeathrserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
