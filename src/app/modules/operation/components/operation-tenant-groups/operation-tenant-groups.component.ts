import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OperationTenantGroupService } from 'src/app/services/operation/api/operation-tenant-group.service';
import { Subject, Subscription } from 'rxjs';
import { OperationTenantGroup } from 'src/app/services/operation/api/responses';
import { OperationConfirmService } from 'src/app/services/operation/operation-confirm.service';
import { Router } from '@angular/router';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';

@Component({
  selector: 'app-operation-tenant-groups',
  templateUrl: './operation-tenant-groups.component.html',
  styleUrls: [ './operation-tenant-groups.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantGroupsComponent implements OnInit, OnDestroy {

  list$ = new Subject<OperationTenantGroup[]>();
  s = new Subscription();
  displayedColumns: TableListColumnType<OperationTenantGroup>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: '店舗グループ名',
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private operationTenantGroupService: OperationTenantGroupService,
    private operationConfirmService: OperationConfirmService,
    private router: Router,
  ) {
  }

  getNameFn = (v: OperationTenantGroup) => v.name;

  ngOnInit(): void {
    this.s.add(
      this.operationTenantGroupService.list()
        .subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onDelete(data: OperationTenantGroup) {
    this.s.add(
      this.operationTenantGroupService.delete(data.id)
        .subscribe((res) => {
          this.list$.next(res);
        }),
    );
  }

  onClickRow(data: OperationTenantGroup) {
    this.router.navigateByUrl(`/operation/tenant-groups/${ data.id }`);
  }
}
