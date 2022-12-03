import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from 'core/graphql';
import { Observable } from 'rxjs';
import { InfiniteScrollComponent } from '../../components/infinite-scroll/infinite-scroll.component';
import { UserCardComponent } from '../../user/components/user-card/user-card.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserCardComponent, InfiniteScrollComponent, RouterLink],
  template: `
    <app-infinite-scroll (fetchMore)="fetchMore()">
      <app-user-card *ngFor="let user of users | async" [user]="user"> </app-user-card>
    </app-infinite-scroll>
  `,
})
export class DashboardComponent implements OnInit {
  declare users: Observable<User[]>;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getAll();
  }

  fetchMore() {
    this.userService.fetchMore();
  }
}
