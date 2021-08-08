import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  /**
   * This function is used to login the user to commissioner account.
   * @param username: Username of the account
   * @param password: Password provided by user.
   */
  login(username: string, password: string): Observable<boolean> {
    if (username == 'zikra' && password == 'Senior@123') {
      return of(true);
    }
    return of(false);
  }
}
