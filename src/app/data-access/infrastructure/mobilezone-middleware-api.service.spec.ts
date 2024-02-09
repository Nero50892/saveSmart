import { TestBed } from '@angular/core/testing';

import { MobilezoneMiddlewareApiService } from './mobilezone-middleware-api.service';

describe('MobilezoneMiddlewareApiService', () => {
  let service: MobilezoneMiddlewareApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilezoneMiddlewareApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
