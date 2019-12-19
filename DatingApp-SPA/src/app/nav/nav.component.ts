import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {User} from '../shared/user.model';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  /**
   * Handle login when click button login
   */
  onLogin() {
    const user: User = this.signupForm.value;
    this.authService.login(user).subscribe(
      (response) => this.alertify.success('Logged in successfully'),
      (error) => this.alertify.error(error)
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.warning('logged out');
  }
}
