import { TestBed } from '@angular/core/testing';

import { BankApiService } from './bank-api.service';

describe('BankApiService', () => {
  let service: BankApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
