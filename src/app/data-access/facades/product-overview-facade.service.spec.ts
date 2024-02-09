import { TestBed } from '@angular/core/testing';

import { ProductOverviewFacadeService } from './product-overview-facade.service';

describe('ProductOverviewFacadeService', () => {
  let service: ProductOverviewFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOverviewFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
