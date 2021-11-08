import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationUserRole } from 'src/app/services/operation/api/responses';

@Injectable({
  providedIn: 'root',
})
export class OperationUserRoleService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<OperationUserRole[]>('@op/master/roles');
  }
}
