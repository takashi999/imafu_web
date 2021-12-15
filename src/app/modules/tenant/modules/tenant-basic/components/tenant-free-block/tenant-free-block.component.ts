import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeBlockService } from 'src/app/services/tenant/api/tenant-free-block.service';

@Component({
  selector: 'app-tenant-free-block',
  templateUrl: './tenant-free-block.component.html',
  styleUrls: [ './tenant-free-block.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBlockComponent implements OnInit, OnDestroy {

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
    {
      key: 'delete',
    },
  ];

  constructor(
    private tenantFreeBlockService: TenantFreeBlockService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.title;

  ngOnInit(): void {
    this.s.add(
      this.tenantFreeBlockService.list()
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
    this.s.add(
      this.tenantFreeBlockService.delete(data.id)
        .subscribe((res) => {
          this.list$.next(res);
        }),
    );
  }
}
