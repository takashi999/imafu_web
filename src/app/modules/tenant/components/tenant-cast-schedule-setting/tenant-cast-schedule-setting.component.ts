import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength10Validator } from 'src/app/validators/common-validators';
import { TenantCastScheduleSettingService } from 'src/app/services/tenant/api/tenant-cast-schedule-setting.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TenantCastScheduleSettingResponse } from 'src/app/services/tenant/api/responses';

@Component({
  selector: 'app-tenant-cast-schedule-setting',
  templateUrl: './tenant-cast-schedule-setting.component.html',
  styleUrls: [ './tenant-cast-schedule-setting.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastScheduleSettingComponent implements OnInit, OnDestroy {

  s = new Subscription();

  fg = new FormGroup({
    no_schedule_comment: new FormControl('', [ Validators.required, maxLength10Validator ]),
    dashboard_display_num: new FormControl('30', [ Validators.required ]),
    dashboard_minute_step: new FormControl('1', [ Validators.required ]),
  });

  detail$ = new BehaviorSubject<TenantCastScheduleSettingResponse | null>(null);

  display_num_selects: { value: string; label: string }[] = [
    { value: '30', label: '30人' },
    { value: '60', label: '60人' },
    { value: '90', label: '90人' },
  ];
  minute_step_selects: { value: string; label: string }[] = [
    { value: '1', label: '1分' },
    { value: '10', label: '10分' },
    { value: '15', label: '15分' },
    { value: '30', label: '30分' },
  ];

  constructor(
    private tenantCastScheduleSettingService: TenantCastScheduleSettingService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantCastScheduleSettingService.get()
        .subscribe(res => {
          this.updateValue(res);
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.tenantCastScheduleSettingService.modify(this.fg.value)
      .subscribe(res => {
        this.updateValue(res);
      });
  }

  private updateValue(res: TenantCastScheduleSettingResponse) {
    this.detail$.next(res);
    this.fg.patchValue({
      ...res,
      dashboard_display_num: res.dashboard_display_num.toString(10),
      dashboard_minute_step: res.dashboard_minute_step.toString(10),
    }, { emitEvent: false });
  }
}
