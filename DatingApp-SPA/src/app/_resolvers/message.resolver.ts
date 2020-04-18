import {Injectable} from '@angular/core';
import {UserService} from '../_services/user.service';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {AlertifyService} from '../_services/alertify.service';
import {User} from '../_models/user';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodeToken.nameid, this.pageNumber
        , this.pageSize, this.messageContainer)
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
