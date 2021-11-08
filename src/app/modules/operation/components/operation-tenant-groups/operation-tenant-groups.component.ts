import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationTenantGroupService } from 'src/app/services/operation/api/operation-tenant-group.service';
import { Subscription } from 'rxjs';
import { OperationTenant } from 'src/app/services/operation/api/responses';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-operation-tenant-groups',
  templateUrl: './operation-tenant-groups.component.html',
  styleUrls: [ './operation-tenant-groups.component.scss' ],
})
export class OperationTenantGroupsComponent implements OnInit, OnDestroy {

  list$ = this.operationTenantGroupService.list();
  rippleDisable = false;
  s = new Subscription();
  displayedColumns = [
    'id',
    'name',
  ];

  constructor(
    private operationTenantGroupService: OperationTenantGroupService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickDelete(e: Event, data: OperationTenant) {
    e.stopPropagation();
    // this.onDelete(data.id, data.name);
  }

  onMouseEnter(e: MouseEvent) {
    this.rippleDisable = true;
  }

  onMouseLeave(e: MouseEvent) {
    this.rippleDisable = false;
  }

  // onDelete(id: number, name: string) {
  //   this.s.add(
  //     this.operationConfirmService.open(`${ name }を削除しますか？`)
  //       .pipe(
  //         mergeMap(() => this.operationTenantService.delete(id)),
  //       )
  //       .subscribe(() => {
  //         this.list$ = this.operationTenantService.list();
  //       }),
  //   );
  // }
}
