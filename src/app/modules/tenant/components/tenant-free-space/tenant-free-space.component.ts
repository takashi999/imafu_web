import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeSpaceService } from 'src/app/services/tenant/api/tenant-free-space.service';

@Component({
  selector: 'app-tenant-free-space',
  templateUrl: './tenant-free-space.component.html',
  styleUrls: ['./tenant-free-space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFreeSpaceComponent implements OnInit, OnDestroy {

  list$: Subject<any[]> = new Subject();
  s = new Subscription();
  columns: TableListColumnType<any>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: 'タイトル',
    },
  ];

  constructor(
    private tenantFreeSpaceService: TenantFreeSpaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.tenantFreeSpaceService.list()
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
