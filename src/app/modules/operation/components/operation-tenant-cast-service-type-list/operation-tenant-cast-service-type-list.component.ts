import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OperationTenantCastServiceService } from 'src/app/services/operation/api/operation-tenant-cast-service.service';
import { OperationTenantCastServiceType } from 'src/app/services/operation/api/responses';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-operation-tenant-cast-service-type-list',
  templateUrl: './operation-tenant-cast-service-type-list.component.html',
  styleUrls: [ './operation-tenant-cast-service-type-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantCastServiceTypeListComponent implements OnInit, OnDestroy {

  s = new Subscription();

  list$: BehaviorSubject<OperationTenantCastServiceType[] | null> = new BehaviorSubject<OperationTenantCastServiceType[] | null>(null);
  displayedColumns: TableListColumnType<OperationTenantCastServiceType>[] = [
    {
      label: 'ID',
      key: 'id',
    },
    {
      label: '識別ID',
      key: 'service_type_id',
    },
    {
      label: '名前',
      key: 'display_name',
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private operationTenantCastServiceService: OperationTenantCastServiceService,
    private router: Router,
  ) {
  }

  getNameFn = (v: OperationTenantCastServiceType) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.operationTenantCastServiceService.list()
        .subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickRow(data: OperationTenantCastServiceType) {
    this.router.navigateByUrl(`/operation/cast-services/${ data.id }`);
  }

  onDelete(data: OperationTenantCastServiceType) {
    this.s.add(
      this.operationTenantCastServiceService.delete(data.id)
        .subscribe((res) => {
          this.list$.next(res);
        }),
    );
  }
}
