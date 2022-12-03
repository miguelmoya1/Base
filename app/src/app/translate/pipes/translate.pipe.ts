import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from 'core/graphql';
import { TranslateService } from '../translate.service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(protected readonly translateService: TranslateService) {}

  transform(value: keyof Translate | string) {
    return this.translateService?.local?.[value as keyof Translate] || value;
  }
}
