import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslatePipe } from '../../translate/pipes/translate.pipe';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="text-xs text-red-500 mt-1 h-2">
      <ng-container *ngIf="_showErrors && message">
        <div>{{ message | translate }}</div>
      </ng-container>
    </div>
  `,
})
export class ErrorComponent {
  declare message?: string;
  declare _errors: ValidationErrors | null | undefined;
  declare _showErrors: boolean;

  @Input() set errors(errors: ValidationErrors | null | undefined) {
    this._errors = errors;
    this.serErrors();
  }
  @Input() set showErrors(showErrors: boolean | undefined) {
    this._showErrors = !!showErrors;
  }

  serErrors() {
    if (this._errors) {
      const values = Object.values(this._errors);
      this.message = values[0];
    } else {
      this.message = undefined;
    }
  }
}
