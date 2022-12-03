import { FormControl } from '@angular/forms';

export interface UserForm {
  nickname: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
}
