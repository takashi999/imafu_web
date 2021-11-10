import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { OperationUser } from 'src/app/services/operation/api/responses';
import { OperationConfirmService } from 'src/app/services/operation/operation-confirm.service';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-users',
  templateUrl: './operation-users.component.html',
  styleUrls: [ './operation-users.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationUsersComponent implements OnInit, OnDestroy {
  staffs$ = new Subject<OperationUser[]>();
  s = new Subscription();
  displayedColumns: TableListColumnType<OperationUser>[] = [
    { key: 'id', label: 'ID' },
    { key: 'login_id', label: 'ログインID' },
    { key: 'role.display_name', label: '権限' },
    { key: 'delete' },
  ];

  constructor(
    private operationStaffService: OperationStaffService,
    private operationConfirmService: OperationConfirmService,
    private router: Router,
  ) {
  }

  getNameFn = (v: OperationUser) => v.login_id;

  ngOnInit(): void {
    this.s.add(
      this.operationStaffService.list().subscribe(res => this.staffs$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickRow(data: OperationUser) {
    this.router.navigateByUrl(`/operation/users/${ data.id }`);
  }

  onDelete(data: OperationUser) {
    this.s.add(
      this.operationStaffService.delete(data.id)
        .subscribe((res) => {
          this.staffs$.next(res);
        }),
    );
  }
}
