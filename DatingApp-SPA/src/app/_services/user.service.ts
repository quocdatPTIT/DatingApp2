import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../_models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// const httpOption = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'users');
  }
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + 'users/' + id);
  }
}
