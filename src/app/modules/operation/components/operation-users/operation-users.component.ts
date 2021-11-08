import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { OperationUser } from 'src/app/services/operation/api/responses';
import { OperationConfirmService } from 'src/app/services/operation/operation-confirm.service';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-operation-users',
  templateUrl: './operation-users.component.html',
  styleUrls: [ './operation-users.component.scss' ],
})
export class OperationUsersComponent implements OnInit, OnDestroy {
  staffs$ = this.operationStaffService.list();
  rippleDisable = false;
  s = new Subscription();
  displayedColumns = [
    'id',
    'login_id',
    'role',
    'delete',
  ];

  constructor(
    private operationStaffService: OperationStaffService,
    private operationConfirmService: OperationConfirmService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickDelete(e: Event, data: OperationUser) {
    e.stopPropagation();
    this.onDelete(data.id);
  }

  onMouseEnter(e: MouseEvent) {
    this.rippleDisable = true;
  }

  onMouseLeave(e: MouseEvent) {
    this.rippleDisable = false;
  }

  onDelete(id: number) {
    this.s.add(
      this.operationConfirmService.open(`ユーザー（ID: ${ id }）を削除しますか？`)
        .pipe(
          mergeMap(() => this.operationStaffService.delete(id)),
        )
        .subscribe(() => {
          this.staffs$ = this.operationStaffService.list();
        }),
    );
  }
}
