import { TestBed } from '@angular/core/testing';

import { ExecutiveRoleGuard } from './executive-role.guard';

describe('ExecutiveRoleGuard', () => {
  let guard: ExecutiveRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExecutiveRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
