import { Message } from './../../_models/message';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentId = +this.authService.decodeToken.nameid;
    this.userService.getMessageThread(this.authService.decodeToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        for (const message of messages) {
          if (message.isRead === false && message.recipientId === currentId) {
            this.userService.markAsRead(currentId, message.id);
          }
        }
      })
    )
    .subscribe((messages) => {
      this.messages = messages;
    }, (error) => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodeToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.push(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }
}
