import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  TenantCast,
  TenantCastScheduleResponse,
  TenantCastScheduleSettingResponse,
} from 'src/app/services/tenant/api/responses';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isToday, parseISO } from 'date-fns';
import { maxLength20Validator } from 'src/app/validators/common-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-cast-schedule-dialog',
  templateUrl: './tenant-cast-schedule-dialog.component.html',
  styleUrls: [ './tenant-cast-schedule-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastScheduleDialogComponent implements OnInit, OnDestroy {

  s = new Subscription();

  fg = new FormGroup({
    tenant_cast_id: new FormControl(''),
    schedule_date: new FormControl(''),
    start_time: new FormControl('', [ Validators.required, Validators.pattern(/^\d{2}:\d{2}$/) ]),
    end_time: new FormControl('', [ Validators.required, Validators.pattern(/^\d{2}:\d{2}$/) ]),
    finished: new FormControl(false),
    comment: new FormControl('', [ maxLength20Validator ]),
  });
  timeControl = new FormControl([ '', '' ], [
    control => {
      return Validators.required(control.value[0]) ??
        Validators.required(control.value[1]) ??
        Validators.pattern(/^\d{2}:\d{2}$/)(control.value[0]) ??
        Validators.pattern(/^\d{2}:\d{2}$/)(control.value[1]);
    },
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      date: { dateISO: string; dateString: string; year: number; month: number; date: number; };
      cast: TenantCast;
      setting: TenantCastScheduleSettingResponse;
      data?: TenantCastScheduleResponse;
    },
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.timeControl.valueChanges.subscribe(([ firstTime, lastTime ]) => {
        this.fg.patchValue({
          start_time: firstTime,
          end_time: lastTime,
        }, { emitEvent: false });
        this.checkFinishedEnabled();
      }),
    );
    this.s.add(
      this.fg.valueChanges.subscribe(({ start_time, end_time }) => {
        this.timeControl.setValue([ start_time, end_time ], { emitEvent: false });
      }),
    );

    this.s.add(
      this.fg.statusChanges.subscribe(() => {
        this.checkFinishedEnabled();
      }),
    );

    const isTodayData = isToday(parseISO(this.data.date.dateISO));
    this.fg.get('finished')?.[isTodayData ? 'enable' : 'disable']({ emitEvent: false });
    this.fg.patchValue({
      ...this.data.data,
      tenant_cast_id: this.data.cast.id,
      schedule_date: this.data.date.dateISO,
      finished: !!this.data.data?.finished_at,
    }, { emitEvent: false });
    this.timeControl.setValue([ this.data.data?.start_time.substr(0, 5) ?? '', this.data.data?.end_time.substr(0, 5) ?? '' ]);
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  private checkFinishedEnabled() {
    const isTimeValid = !!this.fg.get('start_time')?.valid && !!this.fg.get('end_time')?.valid;

    this.fg.get('finished')?.[isTimeValid ? 'enable' : 'disable']({ emitEvent: false });
  }

}
