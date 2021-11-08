import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationTenantService } from 'src/app/services/operation/api/operation-tenant.service';
import { Subscription } from 'rxjs';
import { OperationTenant } from 'src/app/services/operation/api/responses';
import { mergeMap } from 'rxjs/operators';
import { OperationConfirmService } from 'src/app/services/operation/operation-confirm.service';

@Component({
  selector: 'app-operation-tenants',
  templateUrl: './operation-tenants.component.html',
  styleUrls: [ './operation-tenants.component.scss' ],
})
export class OperationTenantsComponent implements OnInit, OnDestroy {

  list$ = this.operationTenantService.list();
  rippleDisable = false;
  s = new Subscription();
  displayedColumns = [
    'id',
    'name',
    'delete',
  ];

  constructor(
    private operationTenantService: OperationTenantService,
    private operationConfirmService: OperationConfirmService,
  ) {
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickDelete(e: Event, data: OperationTenant) {
    e.stopPropagation();
    this.onDelete(data.id, data.name);
  }

  onMouseEnter(e: MouseEvent) {
    this.rippleDisable = true;
  }

  onMouseLeave(e: MouseEvent) {
    this.rippleDisable = false;
  }

  onDelete(id: number, name: string) {
    this.s.add(
      this.operationConfirmService.open(`${ name }を削除しますか？`)
        .pipe(
          mergeMap(() => this.operationTenantService.delete(id)),
        )
        .subscribe(() => {
          this.list$ = this.operationTenantService.list();
        }),
    );
  }

}
