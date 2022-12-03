import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'core/graphql';
import { CardComponent } from '../../../components/card/card.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { RatedComponent } from '../../../components/rated/rated.component';
import { RatingComponent } from '../../../components/rating/rating.component';
import { DistancePipe } from '../../../shared/pipes/distance.pipe';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, LoadingComponent, DistancePipe, RatedComponent, CardComponent, RatingComponent],
  template: `
    <div class="container mx-auto px-4 mt-20">
      <app-card *ngIf="user; else loading">
        <div class="px-6">
          <div class="flex flex-wrap justify-center gap-8">
            <div class="w-full lg:w-6/12 px-4 lg:order-2 flex justify-center">
              <img alt="..." [src]="user.imageUrl" class="shadow-xl rounded-full -mt-16 h-44 w-44 xl:h-64 xl:w-64" />
            </div>

            <div class="w-full lg:w-3/12 lg:order-3 flex justify-center items-center">
              <button
                class="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                FOLLOW
              </button>
            </div>

            <div class="m-auto lg:w-3/12 lg:order-1 flex justify-center">
              <app-rated [rating]="user.averageRating || 0"></app-rated>
            </div>
          </div>

          <div class="text-center mt-12">
            <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">{{ user.nickname }}</h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
              {{ user.distance | distance }}
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <app-rating [editable]="false"></app-rating>
          </div>
        </div>
      </app-card>
    </div>

    <ng-template #loading>
      <app-loading class="w-12 h-12 m-auto"></app-loading>
    </ng-template>
  `,
})
export class UserComponent implements OnInit {
  declare readonly id: string;
  declare user: User;

  constructor(private readonly route: ActivatedRoute, private readonly userService: UserService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit() {
    this.user = await this.userService.getByID(this.id);
  }
}
