import { TestBed } from '@angular/core/testing';

import { LoginGaurd } from './login-gaurd.guard';

describe('LoginGaurdGuard', () => {
  let guard: LoginGaurd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGaurd);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
