import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardComponent } from '../../../components/card/card.component';
import { ROUTES } from '../../../shared/screens';
import { TranslatePipe } from '../../../translate/pipes/translate.pipe';
import { GeolocationService } from '../../geolocation.service';

@Component({
  selector: 'app-geolocation',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe, CardComponent],
  template: `
    <div class="flex flex-col items-center justify-center m-8">
      <app-card>
        <h1 class="text-2xl font-bold text-center mb-8">
          {{ 'geolocationTitle' | translate }}
        </h1>
        <p class="my-4 text-justify">
          {{ 'geolocationDescription' | translate }}
        </p>
        <app-button class="mt-8" (click)="requestPermissions()">
          {{ 'geolocationButton' | translate }}
        </app-button>
      </app-card>
    </div>
  `,
})
export class GeolocationComponent {
  constructor(private readonly geolocationService: GeolocationService, private readonly router: Router) {}

  async requestPermissions() {
    let permission = await this.geolocationService.hasPermissions();

    if (!permission) {
      permission = await this.geolocationService.requestPermissions();
    }

    if (permission) {
      this.router.navigate([ROUTES.dashboard.route]);
    }
  }
}
