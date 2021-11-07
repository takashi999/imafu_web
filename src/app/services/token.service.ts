import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  tokens = {
    operationToken: localStorage.getItem('operationToken') ?? '',
  };

  constructor() {
  }

  setOperationToken(val: string) {
    this.tokens.operationToken = val;
    localStorage.setItem('operationToken', val);
  }

  resetToken(tokenKey:keyof TokenService['tokens']) {
    this.tokens[tokenKey] = '';
    localStorage.removeItem(tokenKey);
  }
}
