import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeBannerService } from 'src/app/services/tenant/api/tenant-free-banner.service';
import { TenantFreeBanner } from 'src/app/services/tenant/api/responses';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';

@Component({
  selector: 'app-tenant-free-banner',
  templateUrl: './tenant-free-banner.component.html',
  styleUrls: [ './tenant-free-banner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBannerComponent implements OnInit, OnDestroy {

  list$: Subject<TenantFreeBanner[]> = new Subject();
  freeBannerSpaces$ = this.tenantMasterService.freeBannerDisplaySpaces();
  s = new Subscription();
  columns: TableListColumnType<TenantFreeBanner>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: '名前',
    },
    {
      key: 'publish_at',
      label: '公開',
      transform: (v: string | null) => v !== null ? '公開' : '非公開',
    },
  ];

  constructor(
    private tenantFreeBannerService: TenantFreeBannerService,
    private tenantMasterService: TenantMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.title;

  ngOnInit(): void {
    this.s.add(
      this.tenantFreeBannerService.list()
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
