import { Routes } from '@angular/router';
import {HomeComponent} from './app/home/home.component';
import {MemberListComponent} from './app/member/member-list/member-list.component';
import {MessagesComponent} from './app/messages/messages.component';
import {ListsComponent} from './app/lists/lists.component';
import {AuthGuard} from './app/_guards/auth.guard';
import {MemberDetailComponent} from './app/member/member-detail/member-detail.component';
import {MemberDetailResolver} from './app/_resolvers/member-detail.resolver';
import {MemberListResolver} from './app/_resolvers/member-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members',
        component: MemberListComponent,
        resolve: {users: MemberListResolver} },
      { path: 'members/:id',
        component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver} },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
