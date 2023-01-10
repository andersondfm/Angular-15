import { Component } from '@angular/core';
import { UntypedFormGroup, AbstractControl } from '@angular/forms';

@Component({
  template: ''
})
export abstract class BaseFormComponent {

  // the form model
  form!: UntypedFormGroup;

  getErrors(
    control: AbstractControl,
    displayName: string,
    customMessages: { [k: string]: string } = {}
  ): string[] {
    var errors: string[] = [];
    Object.keys(control.errors || {}).forEach((key) => {
      switch (key) {
        case 'required':
          errors.push(`${displayName} ${customMessages?.[key] ?? "é obrigatório."}`);
          break;
        case 'pattern':
          errors.push(`${displayName} ${customMessages?.[key] ?? "contains invalid characters."}`);
          break;
        case 'isDupeField':
          errors.push(`${displayName} ${customMessages?.[key] ?? "already exists: please choose another."}`);
          break;
        default:
          errors.push(`${displayName} não é valido.`);
          break;
      }
    });
    return errors;
  }

  constructor() { }

}
