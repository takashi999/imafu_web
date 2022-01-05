import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeImageService } from 'src/app/services/tenant/api/tenant-free-image.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';

@Component({
  selector: 'app-tenant-free-image',
  templateUrl: './tenant-free-image.component.html',
  styleUrls: [ './tenant-free-image.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeImageComponent implements OnInit, OnDestroy {

  list$: Subject<any[]> = new Subject();
  freeImageTypes$ = this.tenantMasterService.freeImageTypes();
  s = new Subscription();
  columns: TableListColumnType<any>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: '名前',
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private tenantFreeImageService: TenantFreeImageService,
    private tenantMasterService: TenantMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.title;

  ngOnInit(): void {
    this.s.add(
      this.tenantFreeImageService.list()
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

  onDelete(data: any) {
    this.s.add(this.tenantFreeImageService.delete(data.id).subscribe(res =>
      this.list$.next(res),
    ));
  }
}
