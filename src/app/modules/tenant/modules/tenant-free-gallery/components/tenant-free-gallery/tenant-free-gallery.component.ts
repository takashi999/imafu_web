import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeGalleryService } from 'src/app/services/tenant/api/tenant-free-gallery.service';

@Component({
  selector: 'app-tenant-free-gallery',
  templateUrl: './tenant-free-gallery.component.html',
  styleUrls: [ './tenant-free-gallery.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeGalleryComponent implements OnInit, OnDestroy {

  list$: Subject<any[]> = new Subject();
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
      key: 'publish_at',
      label: '公開',
      transform: (v: string | null) => v !== null ? '公開' : '非公開',
    },
  ];

  constructor(
    private tenantFreeGalleryService: TenantFreeGalleryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.tenantFreeGalleryService.list()
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
