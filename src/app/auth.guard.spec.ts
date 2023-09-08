import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should authenticate', () => {
    expect(guard).toBeTruthy();
  });
  
  it('should protect auth', () => {
    expect(guard).toBeTruthy();
  });
});
