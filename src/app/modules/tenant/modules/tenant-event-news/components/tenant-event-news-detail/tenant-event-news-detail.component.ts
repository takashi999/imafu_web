import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength100000Validator } from 'src/app/validators/common-validators';
import { addWeeks, format } from 'date-fns';
import { TenantEventNewsService } from 'src/app/services/tenant/api/tenant-event-news.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TenantEventNews } from 'src/app/services/tenant/api/responses';

@Component({
  selector: 'app-tenant-event-news-detail',
  templateUrl: './tenant-event-news-detail.component.html',
  styleUrls: [ './tenant-event-news-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantEventNewsDetailComponent implements OnInit, OnDestroy {
  s = new Subscription();
  fg = new FormGroup({
    is_use: new FormControl('0', [ Validators.required ]),
    publish_start_at: new FormControl(format(Date.now(), 'yyyy-MM-dd'), [ Validators.required ]),
    publish_end_at: new FormControl(format(addWeeks(Date.now(),1), 'yyyy-MM-dd'), [ Validators.required ]),
    editable_text_type_id: new FormControl('', [ Validators.required ]),
    content: new FormControl('', [ maxLength100000Validator ]),
  });

  detail$ = new BehaviorSubject<TenantEventNews | null>(null);

  isUseSelects: { value: string; label: string }[] = [
    { value: '1', label: '使用' },
    { value: '0', label: '未使用' },
  ];

  constructor(
    private tenantEventNewsService: TenantEventNewsService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantEventNewsService.get().subscribe(res => this.detail$.next(res)),
    );

    this.s.add(this.detail$.subscribe(res => this.fg.patchValue({
      ...res,
      is_use: res?.is_use?.toString(10) ?? '0',
      editable_text_type_id: res?.editable_text_type_id?.toString(10),
    }, { emitEvent: false })));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(this.tenantEventNewsService.modify(this.fg.value).subscribe(res => this.detail$.next(res)));
  }

}
