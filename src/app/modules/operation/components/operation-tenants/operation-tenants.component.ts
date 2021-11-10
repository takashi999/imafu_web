import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';
import { Subject, Subscription } from 'rxjs';
import { OperationTenant } from 'src/app/services/operation/api/responses';
import { OperationConfirmService } from 'src/app/services/operation/operation-confirm.service';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-tenants',
  templateUrl: './operation-tenants.component.html',
  styleUrls: [ './operation-tenants.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantsComponent implements OnInit, OnDestroy {

  list$ = new Subject<OperationTenant[]>();
  s = new Subscription();
  displayedColumns: TableListColumnType<OperationTenant>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: '店舗名' },
    { key: 'delete' },
  ];


  constructor(
    private operationTenantService: OperationTenantService,
    private operationConfirmService: OperationConfirmService,
    private router: Router,
  ) {
  }

  getNameFn = (v: OperationTenant) => v.name;

  ngOnInit(): void {
    this.s.add(
      this.operationTenantService.list().subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }


  onClickRow(data: OperationTenant) {
    this.router.navigateByUrl(`/operation/tenants/${ data.id }`);
  }

  onDelete(data: OperationTenant) {
    this.s.add(
      this.operationTenantService.delete(data.id)
        .subscribe((res) => {
          this.list$.next(res);
        }),
    );
  }

}
