import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from 'core/graphql';
import { CardComponent } from '../../../components/card/card.component';
import { RatedComponent } from '../../../components/rated/rated.component';
import { SvgComponent } from '../../../components/svg/svg.component';
import { ROUTES } from '../../../shared/screens';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, CardComponent, SvgComponent, RouterLink, RatedComponent],
  template: `
    <app-card *ngIf="user" [routerLink]="ROUTES.user.detail.route(user.id)">
      <div class="w-full h-full flex justify-start relative gap-2" *ngIf="user">
        <div class="rounded-full overflow-hidden">
          <img class="w-24 h-24 object-cover" [src]="user.imageUrl" alt="avatar" />
        </div>

        <h2 class="text-2xl font-bold">{{ user.nickname }}</h2>

        <div class="absolute bottom-0 right-0 text-end">
          <app-rated [rating]="user.averageRating || 0"></app-rated>
        </div>
      </div>
    </app-card>
  `,
})
export class UserCardComponent {
  readonly ROUTES = ROUTES;

  @Input() declare user: User;
}
