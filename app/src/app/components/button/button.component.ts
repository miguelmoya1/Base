import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="btn w-full rounded transition-all duration-700 ease-in-out text-center flex items-center justify-center font-bold py-2 px-4 text-white"
      [ngClass]="[
        class || '',
        disabled || loading ? 'cursor-not-allowed !bg-slate-200 !text-gray-500' : '',
        warn ? 'bg-red-500' : 'bg-slate-500'
      ]"
      [disabled]="disabled || loading"
      [type]="type"
    >
      <ng-container *ngIf="loading; else Content">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </ng-container>
      <ng-template #Content>
        <ng-content></ng-content>
      </ng-template>
    </button>
  `,
})
export class ButtonComponent {
  @Input() class?: string;
  @Input() disabled = false;
  @Input() warn = false;
  @Input() loading = false;
  @Input() type?: 'button' | 'submit' | 'reset' = 'button';
}
