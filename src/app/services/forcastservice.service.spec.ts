import { TestBed } from '@angular/core/testing';

import { ForcastserviceService } from './forcastservice.service';

describe('ForcastserviceService', () => {
  let service: ForcastserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForcastserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
