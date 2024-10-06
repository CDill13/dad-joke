import { TestBed } from '@angular/core/testing';
import { ToasterService } from './toaster.service';
import * as toastr from 'toastr';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call toastr.success with the correct parameters', () => {
    const successSpy = spyOn(toastr, 'success');
    const message = 'Operation successful!';
    const title = 'Success';
    const options = { timeOut: 3000 };

    service.success(message, title, options);

    expect(successSpy).toHaveBeenCalledWith(message, title, options);
  });

  it('should call toastr.warning with the correct parameters', () => {
    const warningSpy = spyOn(toastr, 'warning');
    const message = 'This is a warning!';
    const title = 'Warning';
    const options = { timeOut: 5000 };

    service.warning(message, title, options);

    expect(warningSpy).toHaveBeenCalledWith(message, title, options);
  });

  it('should call toastr.error with the correct parameters', () => {
    const errorSpy = spyOn(toastr, 'error');
    const message = 'An error occurred!';
    const title = 'Error';
    const options = { timeOut: 10000 };

    service.error(message, title, options);

    expect(errorSpy).toHaveBeenCalledWith(message, title, options);
  });
});
