/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToastAlertService } from './toastAlert.service';

describe('Service: ToastAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastAlertService]
    });
  });

  it('should ...', inject([ToastAlertService], (service: ToastAlertService) => {
    expect(service).toBeTruthy();
  }));
});
