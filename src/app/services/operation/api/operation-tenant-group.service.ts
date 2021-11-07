import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationTenantGroupService {

  constructor(
    private httpClient:HttpClient
  ) { }

  list(){
    return this.httpClient.get("@op/tenant-groups")
  }
}
