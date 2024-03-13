import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderNotificationService {
  #successNotification$ = new Subject<boolean>();
  successNotification$ = this.#successNotification$.asObservable();
  #errorNotification$ = new Subject<boolean>();
  errorNotification$ = this.#errorNotification$.asObservable();

  showSuccessNotification(value: boolean) {
    this.#successNotification$.next(value);
  }

  showErrorNotification(value: boolean) {
    this.#errorNotification$.next(value);
  }
}
