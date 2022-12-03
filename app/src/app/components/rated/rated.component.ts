import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-rated',
  standalone: true,
  imports: [CommonModule, SvgComponent],
  template: `
    <div class="text-sm text-gray-200 flex items-center justify-center gap-2">
      <app-svg type="star" className="text-yellow-300 w-3 h-3"></app-svg>
      {{ rating || 0 }} / 10
    </div>
  `,
})
export class RatedComponent {
  @Input() declare rating: number;
}
