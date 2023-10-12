import { TestBed } from '@angular/core/testing';

import { PackAndDeliveryService } from './pack-and-delivery.service';

describe('PackAndDeliveryService', () => {
  let service: PackAndDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackAndDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
