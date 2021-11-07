import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationUser } from 'src/app/services/operation/api/responses';

@Injectable({
  providedIn: 'root',
})
export class OperationStaffService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<OperationUser[]>('@op/staffs');
  }

  getDetail(id: number) {
    return this.httpClient.get<OperationUser>('@op/staffs/' + id);
  }
}
