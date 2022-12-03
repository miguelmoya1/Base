import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  standalone: true,
})
export class DistancePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value < 1000) {
      return `${value.toFixed(0)} m`;
    } else {
      return `${(value / 1000).toFixed(1)} km`;
    }
  }
}
