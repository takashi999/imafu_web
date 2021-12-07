import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantCastScheduleStandbyResponse } from 'src/app/services/tenant/api/responses';
import { FormControl, FormGroup } from '@angular/forms';
import { format, isPast, isSameMinute, isToday, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { TenantCastScheduleStandbyService } from 'src/app/services/tenant/api/tenant-cast-schedule-standby.service';

@Component({
  selector: 'app-tenant-cast-schedule-stand-by-status-dialog',
  templateUrl: './tenant-cast-schedule-stand-by-status-dialog.component.html',
  styleUrls: [ './tenant-cast-schedule-stand-by-status-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastScheduleStandByStatusDialogComponent implements OnInit, OnDestroy {

  s = new Subscription();
  time = new FormControl();
  standby = new FormControl(false);
  fg = new FormGroup({
    time: this.time,
    standby: this.standby,
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TenantCastScheduleStandbyResponse,
    private dialogRef: MatDialogRef<TenantCastScheduleStandByStatusDialogComponent>,
    private tenantCastScheduleStandbyService: TenantCastScheduleStandbyService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.standby.valueChanges.subscribe(val => {
        this.time[val ? 'disable' : 'enable']({ emitEvent: false });
      }),
    );

    if (this.data.stand_by_status !== null) {
      const scheduled = parseISO(this.data.schedule_date);
      const [ hour, minute, second ] = this.data.stand_by_status.start_time.split(':').map(v => parseInt(v, 10));
      const standbyStartTime = scheduled.setHours(hour, minute, second);
      const isCheckedStandby = isToday(scheduled) &&
        (
          isSameMinute(standbyStartTime, Date.now()) ||
          isPast(standbyStartTime)
        );

      this.time.setValue(this.data.stand_by_status.start_time, { emitEvent: false });

      this.standby.setValue(isCheckedStandby);
    }

  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.tenantCastScheduleStandbyService.modify(this.data.id, {
        time: this.standby.value ? format(Date.now(), 'HH:mm') : this.time.value,
      })
        .subscribe((res) => {
          this.dialogRef.close(res);
        }),
    );
  }
}
