import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  tokens = {
    operationToken: localStorage.getItem('operationToken') ?? '',
    tenantToken: localStorage.getItem('tenantToken') ?? '',
    tenantCastToken: localStorage.getItem('tenantCastToken') ?? '',
  };

  constructor(
    private router: Router,
  ) {
  }

  setOperationToken(val: string) {
    this.tokens.operationToken = val;
    localStorage.setItem('operationToken', val);
  }

  setTenantToken(val: string) {
    this.tokens.tenantToken = val;
    localStorage.setItem('tenantToken', val);
  }

  setTenantCastToken(val: string) {
    this.tokens.tenantCastToken = val;
    localStorage.setItem('tenantCastToken', val);
  }

  resetToken(tokenKey: keyof TokenService['tokens']) {
    this.tokens[tokenKey] = '';
    localStorage.removeItem(tokenKey);
  }
}
