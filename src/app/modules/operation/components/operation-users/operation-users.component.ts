import { Component, OnInit } from '@angular/core';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { OperationUser } from 'src/app/services/operation/api/responses';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-operation-users',
  templateUrl: './operation-users.component.html',
  styleUrls: ['./operation-users.component.scss']
})
export class OperationUsersComponent implements OnInit {
  staffs$ = this.operationStaffService.list()

  constructor(
    private operationStaffService:OperationStaffService
  ) { }

  ngOnInit(): void {
  }

}
