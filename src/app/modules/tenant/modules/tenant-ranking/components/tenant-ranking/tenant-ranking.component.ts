import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantRankingService } from 'src/app/services/tenant/api/tenant-ranking.service';
import { TenantRanking } from 'src/app/services/tenant/api/responses';

@Component({
  selector: 'app-tenant-ranking',
  templateUrl: './tenant-ranking.component.html',
  styleUrls: [ './tenant-ranking.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantRankingComponent implements OnInit, OnDestroy {

  list$: Subject<TenantRanking[]> = new Subject();
  s = new Subscription();
  columns: TableListColumnType<TenantRanking>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: '名前',
    },
    {
      key: 'thumbnail_file_url',
      label: 'サムネイル',
      type: 'image',
    },
    {
      key: 'publish_at',
      label: '公開',
      transform: (v: string | null) => v !== null ? '公開' : '非公開',
    },
  ];

  constructor(
    private tenantRankingService: TenantRankingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.tenantRankingService.list()
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
