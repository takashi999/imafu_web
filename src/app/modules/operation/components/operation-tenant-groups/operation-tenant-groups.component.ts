import { Component, OnInit } from '@angular/core';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';
import { OperationTenantGroupService } from 'src/app/services/operation/api/operation-tenant-group.service';

@Component({
  selector: 'app-operation-tenant-groups',
  templateUrl: './operation-tenant-groups.component.html',
  styleUrls: ['./operation-tenant-groups.component.scss']
})
export class OperationTenantGroupsComponent implements OnInit {

  list$ = this.operationTenantGroupService.list();

  constructor(
    private operationTenantGroupService:OperationTenantGroupService
  ) { }

  ngOnInit(): void {
  }

}
