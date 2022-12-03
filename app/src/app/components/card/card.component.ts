import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-slate-800 text-white shadow-md rounded-lg p-4 relative">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
