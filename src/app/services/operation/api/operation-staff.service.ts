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

  create(body: {
    login_id: string;
    password: string;
    role_id: number;
  }) {
    return this.httpClient.post<OperationUser>('@op/staffs', body);
  }

  modify(id: number, body: {
    login_id: string;
    password?: string;
    role_id: number;
  }) {
    return this.httpClient.patch<OperationUser>('@op/staffs/' + id, body);
  }

  delete(id: number) {
    return this.httpClient.delete<OperationUser>('@op/staffs/' + id);
  }
}
