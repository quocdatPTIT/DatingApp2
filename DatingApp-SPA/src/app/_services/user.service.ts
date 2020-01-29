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
  /**
   * Get all users form db
   */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + 'users');
  }
  /**
   * get user follow id
   * @param id user
   */
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + 'users/' + id);
  }
  /**
   * update user
   * @param id user
   * @param user information need update
   */
  updateUser(id: number, user: User): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.httpClient.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }
}
