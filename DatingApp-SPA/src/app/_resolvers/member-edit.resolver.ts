import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {
    constructor(private authService: AuthService,
                private route: Router,
                private alerttify: AlertifyService,
                private userService: UserService) {}
    resolve(router: ActivatedRouteSnapshot): Observable<User> {
        const id = +this.authService.decodeToken.nameid;
        return this.userService.getUser(id).pipe(
            catchError(error => {
                this.alerttify.error('Problem retrieving your data');
                this.route.navigate(['/members']);
                return of(null);
            })
        );
    }
}
