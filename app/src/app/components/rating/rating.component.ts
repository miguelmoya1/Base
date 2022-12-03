import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../translate/pipes/translate.pipe';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, SvgComponent, TranslatePipe],
  template: `
    <div class="text-sm text-gray-200 flex items-center justify-center gap-16 flex-col">
      <div class="flex flex-col gap-8 border-b pb-8">
        <span class="text-xl"> {{ 'general' | translate }} </span>
        <div class="text-sm text-gray-200 flex items-center justify-center gap-2">
          <app-svg
            type="star"
            [className]="'w-12 h-12 duration-500' + (globalRating >= number ? ' text-yellow-300' : '')"
            *ngFor="let number of [1, 2, 3, 4, 5]"
            (click)="editable && changeGlobalRating(number)"
          ></app-svg>
        </div>
        {{ globalRating || 0 }} / 5
      </div>

      <div class="flex flex-col gap-8" *ngFor="let rate of rating | keyvalue; trackBy: trackByFn">
        <span class="text-xl">{{ rate.key | translate }}</span>
        <div class="text-sm text-gray-200 flex items-center justify-center gap-2">
          <app-svg
            type="star"
            [className]="'w-12 h-12 duration-500' + (+rate.value >= number ? ' text-yellow-300' : '')"
            *ngFor="let number of [1, 2, 3, 4, 5]"
            (click)="editable && setRate(rate.key, number)"
          ></app-svg>
        </div>
      </div>
    </div>
  `,
})
export class RatingComponent implements OnInit {
  @Input() editable = true;

  globalRating = 1;

  rating = {
    honesty: 1,
    straightforwardness: 1,
    determination: 1,
    imagination: 1,
    ambition: 1,
    courage: 1,
    maturity: 1,
    loyalty: 1,
    selfControl: 1,
    independence: 1,
  };

  setRate(key: string, value: number) {
    this.rating[key as keyof typeof this.rating] = value;
    this.calculateGlobalRating();
  }

  trackByFn(item: any) {
    return item;
  }

  ngOnInit() {
    this.calculateGlobalRating();
  }

  calculateGlobalRating() {
    this.globalRating = Object.values(this.rating).reduce((a, b) => a + b, 0) / 10;
  }

  changeGlobalRating(total: number) {
    this.globalRating = total;

    const keys = Object.keys(this.rating) as (keyof typeof this.rating)[];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      this.rating[key] = total;
    }
  }
}
