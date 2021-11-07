import { Component, OnInit } from '@angular/core';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';

@Component({
  selector: 'app-operation-tenants',
  templateUrl: './operation-tenants.component.html',
  styleUrls: ['./operation-tenants.component.scss']
})
export class OperationTenantsComponent implements OnInit {

  list$ = this.operationTenantService.list();

  constructor(
    private operationTenantService:OperationTenantService
  ) { }

  ngOnInit(): void {
  }

}
