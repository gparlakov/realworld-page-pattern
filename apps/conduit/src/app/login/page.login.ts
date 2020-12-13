import { Validators } from '@angular/forms';
import { typedFormControl, typedFormGroup } from "ngx-forms-typed";
import { LoginRegisterModel } from './login-register.types';

export class PageLoginregister {

  public readonly form = typedFormGroup<LoginRegisterModel>({
    name: typedFormControl(''),
    email: typedFormControl('', Validators.compose([Validators.required, Validators.email])),
    password: typedFormControl('', Validators.required),
  })

  constructor() { }

  onPageEnter(): void {
  }

}
