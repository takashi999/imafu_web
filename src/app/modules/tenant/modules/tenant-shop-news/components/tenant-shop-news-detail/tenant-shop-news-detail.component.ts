import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantShopNewsService } from 'src/app/services/tenant/api/tenant-shop-news.service';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TenantShopNews } from 'src/app/services/tenant/api/responses';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength100000Validator } from 'src/app/validators/common-validators';
import { format, parseISO } from 'date-fns';
import { TenantShopNewsRemainingService } from 'src/app/services/tenant/tenant-shop-news-remaining.service';

@Component({
  selector: 'app-tenant-shop-news-detail',
  templateUrl: './tenant-shop-news-detail.component.html',
  styleUrls: [ './tenant-shop-news-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantShopNewsDetailComponent implements OnInit, OnDestroy {
  s = new Subscription();

  id$ = this.activatedRoute.paramMap.pipe(map(paramMap => paramMap.has('tenantShopNewsId') ? parseInt(paramMap.get('tenantShopNewsId') ?? '', 10) : null));
  view$ = new BehaviorSubject<{ detail?: TenantShopNews } | null>(null);

  fg = new FormGroup({
    publish_at: new FormControl('', [ Validators.required ]),
    editable_text_type_id: new FormControl('', [ Validators.required ]),
    content: new FormControl('', [ maxLength100000Validator ]),
  });

  publishAtDateControl = new FormControl('');
  publishAtTimeControl = new FormControl('');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tenantShopNewsService: TenantShopNewsService,
    private tenantShopNewsRemainingService: TenantShopNewsRemainingService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.id$
        .subscribe(id => {
          if (id !== null) {
            this.s.add(this.tenantShopNewsService.get(id).subscribe(res => {
              this.fg.patchValue({
                publish_at: res.publish_at,
                editable_text_type_id: res.editable_text_type_id.toString(10),
                content: res.content,
              });

              this.view$.next({
                ...this.view$.getValue(),
                detail: res,
              });
            }));

            this.fg.get('publish_at')?.disable({ emitEvent: false });
          } else {
            this.view$.next({ ...this.view$.getValue(), detail: undefined });
            this.fg.get('publish_at')?.enable({ emitEvent: false });
          }
        }),
    );

    this.s.add(
      merge(
        this.publishAtDateControl.valueChanges,
        this.publishAtTimeControl.valueChanges,
      ).subscribe(() => {
        const date = this.publishAtDateControl.value;
        const time = this.publishAtTimeControl.value;

        if (date !== '' && time !== '') {
          this.fg.patchValue({
            publish_at: `${ date } ${ time }`,
          }, { emitEvent: false });
        }
      }),
    );
    this.s.add(
      this.fg.get('publish_at')?.valueChanges.subscribe(val => {
        if (val !== '') {
          const parsed = parseISO(val);
          const date = format(parsed, 'yyyy-MM-dd');
          const time = format(parsed, 'HH:mm');
          const methodName = this.fg.get('publish_at')?.disabled ? 'disable' : 'enable';

          this.publishAtDateControl.setValue(date, { emitEvent: false });
          this.publishAtTimeControl.setValue(time, { emitEvent: false });

          this.publishAtDateControl[methodName]({ emitEvent: false });
          this.publishAtTimeControl[methodName]({ emitEvent: false });
        }
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(id: number | null | undefined) {
    if (typeof id === 'undefined' || id === null) {
      this.onCreate();
    } else {
      this.onModify(id);
    }
  }

  onCreate() {
    this.s.add(this.tenantShopNewsService.create(this.fg.value).subscribe(() => {
      this.router.navigate([ '../' ], { relativeTo: this.activatedRoute });
      this.tenantShopNewsRemainingService.updateRemaining();
    }));
  }

  onModify(id: number) {
    this.s.add(this.tenantShopNewsService.modify(id, this.fg.value).subscribe(() => {
      this.router.navigate([ '../' ], { relativeTo: this.activatedRoute });
    }));
  }
}
