import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {

  constructor() {
  }

  getFormData(body: any): FormData {
    const f = new FormData();
    this.flatten(f, body, '');

    return f;
  }

  private flatten(formData: FormData, obj: any, prefix: string) {
    Object.keys(obj).reduce((f, key, i) => {
      const val = obj[key];
      const currentKey = prefix === '' ? key : `${ prefix }[${ key }]`;

      if (val === null) {
        return f;
      }

      switch (typeof val) {
        case 'undefined':
          break;
        case 'object':
          this.flatten(formData, val, currentKey);
          break;
        case 'boolean':
          f.set(currentKey, val ? '1' : '0');
          break;
        case 'number':
          f.set(currentKey, val.toString(10));
          break;
        case 'string':
          f.set(currentKey, val);
          break;
        case 'function':
          break;
        case 'symbol':
          break;
        case 'bigint':
          f.set(currentKey, val.toString());
          break;
      }

      return f;
    }, formData);
  }
}
