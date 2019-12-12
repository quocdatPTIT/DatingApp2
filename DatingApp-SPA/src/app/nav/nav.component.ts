import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService) { }

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
      (response) => console.log('Log in success')
    );
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
  logout() {
    localStorage.removeItem('token');
  }
}
