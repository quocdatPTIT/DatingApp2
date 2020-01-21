import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../shared/user.model';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth';
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  constructor(private http: HttpClient) {}

  /**
   * handle login
   * @param user need login
   */
  login(model: User) {
    return this.http
      .post(`${this.baseUrl}/login`, model)
      .pipe(
          map(
          (response: any) => {
            const user = response;
            if (user) {
              localStorage.setItem('token', user.token);
              this.decodeToken = this.jwtHelper.decodeToken(user.token);
            }
          })
      );
  }

  /**
   * handle register new user
   * @param model new user
   */
  register(model: User) {
    return this.http.post(`${this.baseUrl}/register`, model);
  }

  /**
   * decode jwt
   */
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
