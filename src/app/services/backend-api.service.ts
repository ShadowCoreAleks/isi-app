import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { USERS } from '../mocks/users';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  loadUsers(): Observable<IUser[]> {
    return of(USERS).pipe(delay(1500));
  }
}
