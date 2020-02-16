import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: false}) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  photoUrl: string;
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private router: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.data.subscribe(data => (this.user = data.user));
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  /**
   * Handle when click Save changes
   */
  onUpdateUser() {
    const id = this.authService.decodeToken.nameid;
    this.userService.updateUser(+id, this.user).subscribe(
      response => {
        this.alertify.success('Update user succesfully!');
        this.editForm.reset(this.user);
      },
      error => this.alertify.error(error)
    );
  }

  updateMainPhoto(url: string) {
    this.user.photoUrl = url;
  }
}
