import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { TenantCastPhotoDiaryService } from 'src/app/services/tenant/api/tenant-cast-photo-diary.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TenantCastPhotoDiary, TenantCastPhotoDiaryList } from 'src/app/services/tenant/api/responses';
import { format, parseISO } from 'date-fns';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tenant-photo-diary-list',
  templateUrl: './tenant-photo-diary-list.component.html',
  styleUrls: [ './tenant-photo-diary-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantPhotoDiaryListComponent implements OnInit, OnDestroy {

  s = new Subscription();
  list$ = new BehaviorSubject<TenantCastPhotoDiaryList | null>(null);
  displayedColumns: TableListColumnType<TenantCastPhotoDiary>[] = [
    {
      key: 'post_at',
      label: '投稿日',
      transform: (v: string) => format(parseISO(v), 'yyyy/MM/dd EEE hh:mm'),
    },
    {
      key: 'cast.display_name',
      label: '女の子',
    },
    {
      key: 'title',
      label: 'タイトル',
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tenantCastPhotoDiaryService: TenantCastPhotoDiaryService,
  ) {
  }

  getNameFn = (v: TenantCastPhotoDiary) => v.title;

  ngOnInit(): void {
    this.s.add(this.tenantCastPhotoDiaryService.list().subscribe(res => this.list$.next(res)));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickRow(data: TenantCastPhotoDiary) {
    this.router.navigate([ './', data.id ], { relativeTo: this.activatedRoute });
  }

  onDelete(data: TenantCastPhotoDiary) {
    this.s.add(this.tenantCastPhotoDiaryService.delete(data.id).subscribe(res => this.list$.next(res)));
  }

  onChangePage(e: PageEvent) {
    this.s.add(this.tenantCastPhotoDiaryService.list(e.pageIndex + 1).subscribe(res => this.list$.next(res)));
  }
}
