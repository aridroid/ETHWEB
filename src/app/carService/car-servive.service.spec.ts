import { TestBed } from '@angular/core/testing';

import { CarServiveService } from './car-servive.service';

describe('CarServiveService', () => {
  let service: CarServiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarServiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
