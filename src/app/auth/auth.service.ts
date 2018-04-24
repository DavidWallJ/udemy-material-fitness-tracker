import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {
  // this seems to be how angular handles global state
  // 'EventEmitter' is only to be used for custom events that you emit in components
  // here we are using 'Subject' via 'rxjs'
  authChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    console.log(this.user);
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    console.log(this.user);
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    // this is a trick for return a new instace of this userId
    // so changes cannot be made to the 'user' in this service
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
