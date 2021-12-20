import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, forkJoin, ObservedValueOf, Subscription } from 'rxjs';
import { OperationSiteNewsService } from 'src/app/services/operation/api/operation-site-news.service';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { SiteNewsResponse } from 'src/app/services/operation/api/responses';
import { OperationStaffService } from 'src/app/services/operation/api/operation-staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-operation-site-news',
  templateUrl: './operation-site-news.component.html',
  styleUrls: [ './operation-site-news.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationSiteNewsComponent implements OnInit, OnDestroy, AfterViewInit {

  s = new Subscription();

  list$ = this.operationSiteNewsService.list();
  users$ = this.operationStaffService.list();

  viewSubject = new BehaviorSubject<{
    list: ObservedValueOf<OperationSiteNewsComponent['list$']>
    users: ObservedValueOf<OperationSiteNewsComponent['users$']>
  } | null>(null);

  displayedColumns: TableListColumnType<SiteNewsResponse>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: 'タイトル',
    },
    {
      key: 'updated_at',
      label: '最終更新',
      transform: v => format(parseISO(v), 'yyyy/MM/dd'),
    },
    {
      key: 'created_at',
      label: '作成',
      transform: v => format(parseISO(v), 'yyyy/MM/dd'),
    },
    {
      key: 'publish_start_at',
      label: '掲載開始日',
      transform: v => format(parseISO(v), 'yyyy/MM/dd'),
    },
    {
      key: 'publish_end_at',
      label: '掲載終了日',
      transform: v => v ? format(parseISO(v), 'yyyy/MM/dd') : "無期限",
    },
    {
      key: 'delete',
    },
  ];

  constructor(
    private operationSiteNewsService: OperationSiteNewsService,
    private operationStaffService: OperationStaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  getNameFn = (v: SiteNewsResponse) => v.title;

  ngOnInit(): void {
    this.s.add(
      forkJoin({
        list: this.list$,
        users: this.users$,
      })
        .subscribe(res => this.viewSubject.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  ngAfterViewInit() {
  }

  onClickRow(data: SiteNewsResponse) {
    this.router.navigate([ './', data.id ], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(data: SiteNewsResponse) {
    this.s.add(
      this.operationSiteNewsService.delete(data.id).subscribe(res => {
        this.viewSubject.next({
          users: [],
          ...this.viewSubject.getValue(),
          list: res,
        });
      }),
    );
  }

  onChangePage(e: PageEvent) {
    this.s.add(
      this.operationSiteNewsService.list(e.pageIndex + 1)
        .subscribe(res => {
          this.viewSubject.next({
            users: [],
            ...this.viewSubject.getValue(),
            list: res,
          });
        }),
    );
  }
}
