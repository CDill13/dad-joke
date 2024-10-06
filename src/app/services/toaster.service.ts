import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  public success(
    message: string,
    title: string,
    options?: ToastrOptions
  ): void {
    toastr.success(message, title, options);
  }

  public warning(
    message: string,
    title: string,
    options?: ToastrOptions
  ): void {
    toastr.warning(message, title, options);
  }

  public error(message: string, title: string, options?: ToastrOptions): void {
    toastr.error(message, title, options);
  }
}
