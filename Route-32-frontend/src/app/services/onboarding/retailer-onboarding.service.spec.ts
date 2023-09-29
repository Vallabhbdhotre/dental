import { TestBed } from '@angular/core/testing';

import { RetailerOnboardingService } from './retailer-onboarding.service';

describe('RetailerOnboardingService', () => {
  let service: RetailerOnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailerOnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
