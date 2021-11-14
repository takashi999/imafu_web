import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantStaffService } from 'src/app/services/tenant/api/tenant-staff.service';

@Component({
  selector: 'app-tenant-staff',
  templateUrl: './tenant-staff.component.html',
  styleUrls: ['./tenant-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantStaffComponent implements OnInit , OnDestroy {

  list$: Subject<any[]> = new Subject();
  s = new Subscription();
  columns: TableListColumnType<any>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'login_id',
      label: 'ログインID',
    },
  ];

  constructor(
    private tenantStaffService: TenantStaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.tenantStaffService.list()
        .subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickRow(data: any) {
    this.router.navigate([ data.id ], {
      relativeTo: this.activatedRoute,
    });
  }
}
