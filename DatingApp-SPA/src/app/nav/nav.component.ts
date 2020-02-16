import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signupForm: FormGroup;
  photoUrl: string;
  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  /**
   * Handle login when click button login
   */
  onLogin() {
    const user: User = this.signupForm.value;
    this.authService.login(user).subscribe(
      (response) => this.alertify.success('Logged in successfully'),
      (error) => this.alertify.error(error),
      () => this.router.navigate(['/members'])
    );
  }

  /**
   *
   */
  loggedIn() {
    return this.authService.loggedIn();
  }

  /**
   * handle when logout account
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodeToken = null;

    this.alertify.warning('logged out');
    this.router.navigate(['/home']);
  }
}
