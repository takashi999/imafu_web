import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, of, Subscription } from 'rxjs';
import { mergeMap, multicast } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength300Validator } from 'src/app/validators/common-validators';
import { OperationSiteNewsService } from 'src/app/services/operation/api/operation-site-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteNewsResponse } from 'src/app/services/operation/api/responses';
import { format, parseISO, startOfToday } from 'date-fns';

@Component({
  selector: 'app-operation-site-news-detail',
  templateUrl: './operation-site-news-detail.component.html',
  styleUrls: [ './operation-site-news-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationSiteNewsDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  s = new Subscription();

  viewSubject = new BehaviorSubject<{
    detail: SiteNewsResponse | null
  } | null>(null);

  view$ = multicast(this.viewSubject)(forkJoin({
    detail: of(null),
  }));

  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength300Validator ]),
    publish_start_at: new FormControl('', [ Validators.required ]),
    publish_end_at: new FormControl('', []),
  });

  titleText = '';
  buttonText = '';

  constructor(
    private operationSiteNewsService: OperationSiteNewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.view$.subscribe(res => {
      if (res?.detail) {
        this.fg.patchValue({
          ...res.detail,
          publish_start_at: format(parseISO(res.detail.publish_start_at),"yyyy-MM-dd"),
          publish_end_at: res?.detail.publish_end_at !== null ? format(parseISO(res.detail.publish_end_at),"yyyy-MM-dd") : '',
        });
        this.titleText = `サイト内お知らせ編集: ${ res.detail.title }`;
        this.buttonText = `更新`;
      } else {
        this.fg.reset({
          publish_start_at: format(startOfToday(), 'yyyy-MM-dd'),
        });
        this.titleText = `サイト内お知らせ作成`;
        this.buttonText = `作成`;
      }
    }));

    this.s.add(
      this.activatedRoute.paramMap
        .pipe(mergeMap(paramMap => paramMap.has('site_news_id') ? this.operationSiteNewsService.get(parseInt(paramMap.get('site_news_id') ?? '', 10)) : of(null)))
        .subscribe(res => {
          this.viewSubject.next({
            ...this.viewSubject.getValue(),
            detail: res,
          });
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  ngAfterViewInit() {
  }

  onSubmit(id?: number) {
    this.s.add(
      this.getRequestById(id).subscribe(res => {
        this.router.navigate([ '../' ], { relativeTo: this.activatedRoute });
      }),
    );
  }

  private getRequestById(id?: number) {
    if (typeof id === 'undefined') {
      return this.operationSiteNewsService.create(this.fg.value);
    } else {
      return this.operationSiteNewsService.modify(id, this.fg.value);
    }
  }
}
