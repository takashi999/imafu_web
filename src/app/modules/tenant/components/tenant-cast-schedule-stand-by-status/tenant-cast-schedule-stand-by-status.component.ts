import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantCastScheduleStandbyService } from 'src/app/services/tenant/api/tenant-cast-schedule-standby.service';
import {
  TenantCastScheduleResponse,
  TenantCastScheduleStandbyListResponse,
  TenantCastScheduleStandbyResponse,
} from 'src/app/services/tenant/api/responses';
import { MatDialog } from '@angular/material/dialog';
import { TenantCastScheduleStandByStatusDialogComponent } from 'src/app/modules/tenant/components/tenant-cast-schedule-stand-by-status-dialog/tenant-cast-schedule-stand-by-status-dialog.component';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-cast-schedule-stand-by-status',
  templateUrl: './tenant-cast-schedule-stand-by-status.component.html',
  styleUrls: [ './tenant-cast-schedule-stand-by-status.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastScheduleStandByStatusComponent implements OnInit, OnDestroy {
  list$ = new BehaviorSubject<TenantCastScheduleStandbyListResponse | null>(null);
  s = new Subscription();

  constructor(
    private tenantCastScheduleStandbyService: TenantCastScheduleStandbyService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantCastScheduleStandbyService.get().subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  getAvailableTime(schedule: TenantCastScheduleResponse) {
    return `${ schedule.start_time.substr(0, 5) } - ${ schedule.end_time.substr(0, 5) }`;
  }

  getTimeToAvailableText(status: TenantCastScheduleStandbyResponse['stand_by_status']) {
    return;
  }

  onClickEdit(item: TenantCastScheduleStandbyResponse) {
    const ref = this.matDialog.open<TenantCastScheduleStandByStatusDialogComponent, typeof item, undefined | TenantCastScheduleStandbyListResponse>(TenantCastScheduleStandByStatusDialogComponent, {
      data: item,
      disableClose: true,
    });

    this.s.add(
      ref.afterClosed().subscribe(res => {
        if (res) {
          this.list$.next(res);
        }
      }),
    );
  }

}
