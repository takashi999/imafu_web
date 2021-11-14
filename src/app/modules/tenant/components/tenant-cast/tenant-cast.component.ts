import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';

@Component({
  selector: 'app-tenant-cast',
  templateUrl: './tenant-cast.component.html',
  styleUrls: [ './tenant-cast.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastComponent implements OnInit, OnDestroy {

  list$: Subject<any[]> = new Subject();
  s = new Subscription();
  columns: TableListColumnType<any>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'display_name',
      label: '名前',
    },
  ];

  constructor(
    private tenantCastService: TenantCastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.tenantCastService.list()
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
