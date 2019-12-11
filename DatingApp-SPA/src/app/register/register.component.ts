import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  /**
   * handle when click button cancel
   */
  onCancel() {
    this.cancelRegister.emit(false);
  }

  /**
   * handle when click butotn register
   */
  onRegisterNewUser() {
    const newUser = this.registerForm.value;
    console.log(newUser);
    this.authService.register(newUser).subscribe(
      () => console.log('Register success'),
      error => console.log(error)
    );
  }
}
