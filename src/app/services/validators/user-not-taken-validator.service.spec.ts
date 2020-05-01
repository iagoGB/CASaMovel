import { TestBed } from '@angular/core/testing';

import { UserNotTakenValidatorService } from './user-not-taken-validator.service';

describe('UserNotTakenValidatorService', () => {
  let service: UserNotTakenValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotTakenValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
