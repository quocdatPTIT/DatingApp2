import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',
        [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
    console.log(this.registerForm)
  }

  /**
   * handle when click button cancel
   */
  onCancel() {
    this.cancelRegister.emit(false);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {missmatch: true};
  }

  /**
   * handle when click butotn register
   */
  onRegisterNewUser() {
    // const newUser = this.registerForm.value;
    // console.log(newUser);
    // this.authService.register(newUser).subscribe(
    //   () => this.alertify.success('Registration successfully'),
    //   error => this.alertify.error(error)
    // );
  }
}
