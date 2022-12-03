import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardComponent } from '../../../components/card/card.component';
import { ErrorComponent } from '../../../components/error/error.component';
import { ROUTES } from '../../../shared/screens';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { TranslatePipe } from '../../../translate/pipes/translate.pipe';
import { UserForm } from '../../types';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-set-up',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TranslatePipe,
    ButtonComponent,
    ErrorComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex flex-col items-center justify-center m-8">
      <app-card>
        <h1 class="text-2xl font-bold text-center mb-8">
          {{ 'userSetUpTitle' | translate }}
        </h1>
        <p class="my-4 text-xs text-justify">
          {{ 'userSetUpDescription' | translate }}
        </p>

        <form [formGroup]="form">
          <div class="flex flex-col">
            <label class="text-xs font-bold" for="nickname">
              {{ 'nickname' | translate }}
            </label>
            <input
              class="border border-gray-300 rounded-md p-2 my-2 text-black"
              type="text"
              id="nickname"
              formControlName="nickname"
            />
            <app-error [errors]="nickname?.errors" [showErrors]="nickname?.dirty || nickname?.touched"></app-error>
          </div>
        </form>

        <app-button class="mt-8" (click)="save()" [disabled]="!form.valid">
          {{ 'userSetUpButton' | translate }}
        </app-button>
      </app-card>
    </div>
  `,
})
export class SetUpComponent implements OnInit {
  declare form: FormGroup<Pick<UserForm, 'nickname'>>;

  constructor(
    private readonly validatorsService: ValidatorsService,
    private readonly userService: UserService,
    private readonly route: Router,
  ) {}

  get nickname() {
    return this.form.get('nickname');
  }

  ngOnInit() {
    this.form = new FormGroup({
      nickname: new FormControl<string>(
        '',
        [
          this.validatorsService.required('nicknameRequired'),
          this.validatorsService.minLength(3, 'nicknameMinLength'),
          this.validatorsService.maxLength(20, 'nicknameMaxLength'),
        ],
        [this.validatorsService.uniqueNickname('nicknameUnique')],
      ),
    });
  }

  async save() {
    if (this.form.valid) {
      const updated = await this.userService.updateUser(this.form.value);

      if (updated) {
        this.route.navigate([ROUTES.dashboard.route]);
      }
    }
  }
}
