import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantShopNewsService } from 'src/app/services/tenant/api/tenant-shop-news.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { TenantShopNews } from 'src/app/services/tenant/api/responses';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantShopNewsRemainingService } from 'src/app/services/tenant/tenant-shop-news-remaining.service';

@Component({
  selector: 'app-tenant-shop-news-list',
  templateUrl: './tenant-shop-news-list.component.html',
  styleUrls: [ './tenant-shop-news-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantShopNewsListComponent implements OnInit, OnDestroy {
  s = new Subscription();

  list$ = new BehaviorSubject<TenantShopNews[] | null>(null);
  displayedColumns: TableListColumnType<TenantShopNews>[] = [
    {
      key: 'publish_at',
      label: '公開日時',
      dateFormat: 'yyyy/MM/dd EEE HH:mm',
    },
    {
      key: 'content',
      label: '内容',
      transform: (v: string) => {
        const container = document.createElement('div');
        container.innerHTML = v;
        const plain = container.textContent ?? '';
        return plain.length > 20 ? plain.substr(0, 20) + '...' : plain;
      },
    },
    {
      key: 'created_at',
      label: '登録日時',
      dateFormat: 'yyyy/MM/dd EEE HH:mm',
    },
    {
      key: 'updated_at',
      label: '更新日時',
      dateFormat: 'yyyy/MM/dd EEE HH:mm',
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tenantShopNewsService: TenantShopNewsService,
    public tenantShopNewsRemainingService: TenantShopNewsRemainingService,
  ) {
  }

  getNameFn = (v: TenantShopNews) => v.id.toString(10);

  ngOnInit(): void {
    this.s.add(this.tenantShopNewsService.list().subscribe(res => this.list$.next(res)));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickRow(data: TenantShopNews) {
    this.router.navigate([ './', data.id.toString(10) ], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(data: TenantShopNews) {
    this.s.add(this.tenantShopNewsService.delete(data.id).subscribe(res => this.list$.next(res)));
  }
}
