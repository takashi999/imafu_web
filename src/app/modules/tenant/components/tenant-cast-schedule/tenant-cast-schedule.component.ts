import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { TenantCastScheduleService } from 'src/app/services/tenant/api/tenant-cast-schedule.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import {
  TenantCast,
  TenantCastScheduleListResponse,
  TenantCastScheduleResponse,
  TenantCastScheduleSettingResponse,
} from 'src/app/services/tenant/api/responses';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { TenantCastScheduleSettingService } from 'src/app/services/tenant/api/tenant-cast-schedule-setting.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorJPIntl } from 'src/app/i18n/MatPaginatorJPIntl';
import { formatDate } from '@angular/common';
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  max,
  parseISO,
  setDay,
  startOfMonth,
  startOfToday,
  subDays,
  subMonths,
} from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { TenantCastScheduleDialogComponent } from 'src/app/modules/tenant/components/tenant-cast-schedule-dialog/tenant-cast-schedule-dialog.component';

type DateScheduleDetail = {
  dateISO: string;
  dateString: string;
  year: number;
  month: number;
  date: number;
  dayNum: number;
  isToday: boolean;
  isAvailable: boolean;
}

@Component({
  selector: 'app-tenant-cast-schedule',
  templateUrl: './tenant-cast-schedule.component.html',
  styleUrls: [ './tenant-cast-schedule.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorJPIntl,
    },
  ],
})
export class TenantCastScheduleComponent implements OnInit, OnDestroy {

  s = new Subscription();
  list$ = new BehaviorSubject<TenantCastScheduleListResponse | null>(null);
  dateNormalizedList$: Observable<{
    [year: number]:
      {
        [month: number]:
          {
            [date: number]:
              {
                [cast: number]: TenantCastScheduleResponse | undefined
              } | undefined
          } | undefined
      } | undefined
  }> = this.list$.pipe(
    map(res =>
      res?.reduce((ac, c) => {
        const date = parseISO(c.schedule_date);
        if (!ac[date.getFullYear()]) {
          ac[date.getFullYear()] = {};
        }
        const yearObj = ac[date.getFullYear()] ?? {};
        if (!yearObj[date.getMonth()]) {
          yearObj[date.getMonth()] = {};
        }
        const monthObj = yearObj[date.getMonth()] ?? {};
        if (!monthObj[date.getDate()]) {
          monthObj[date.getDate()] = {};
        }
        const dateObj = monthObj[date.getDate()] ?? {};

        dateObj[c.tenant_cast_id] = c;

        return ac;
      }, {} as { [year: number]: { [month: number]: { [date: number]: { [cast: number]: TenantCastScheduleResponse | undefined } | undefined } | undefined } | undefined }) ??
      {},
    ),
  );
  settings$ = new BehaviorSubject<TenantCastScheduleSettingResponse | null>(null);
  casts$ = new BehaviorSubject<TenantCast[] | null>(null);
  castsSearched$ = new BehaviorSubject<TenantCast[] | null>(null);
  castsIdNormalized$: Observable<{ [castId: number]: TenantCast | undefined }> = this.casts$.pipe(map(res =>
    res?.reduce((ac, c) => {
      ac[c.id] = c;

      return ac;
    }, {} as { [castId: number]: TenantCast | undefined }) ??
    {},
  ));
  castPaged$ = combineLatest([
    this.settings$.pipe(filter((v): v is Exclude<typeof v, null> => v !== null)),
    this.castsSearched$.pipe(filter((v): v is Exclude<typeof v, null> => v !== null)),
  ])
    .pipe(map(([ settings, casts ]): TenantCast[][] => {
      const paged = [];

      for (let i = 0; i < Math.ceil(casts.length / settings.dashboard_display_num); i++) {
        paged.push(casts.slice(settings.dashboard_display_num * i, settings.dashboard_display_num * (i + 1)));
      }

      return paged;
    }));
  currentPageIndex = 0;
  isPrevDisabled = true;
  isNextDisabled = true;

  dates: DateScheduleDetail[][] = [ [] ];

  isMonth = false;
  currentCastId: number | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    private tenantCastScheduleService: TenantCastScheduleService,
    private tenantCastService: TenantCastService,
    private tenantCastScheduleSettingService: TenantCastScheduleSettingService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
  }

  trackByCastId: TrackByFunction<TenantCast> = (index, item) => item.id;

  ngOnInit(): void {
    this.s.add(
      this.tenantCastScheduleSettingService.get()
        .subscribe(res => {
          this.settings$.next(res);
        }),
    );

    this.s.add(
      this.tenantCastService.list()
        .subscribe(res => {
          this.casts$.next(res);
          this.castsSearched$.next(res);
        }),
    );

    this.s.add(
      this.activatedRoute.queryParamMap.subscribe(paramMap => {
        const startDate = paramMap.has('start_date') ? parseISO(paramMap.get('start_date') ?? '') : startOfToday();
        const isMonthMode = paramMap.get('month') === '1';
        const firstDisabledNextStartDate = this.getFirstDisabledNextStartDate(isMonthMode);

        if (differenceInCalendarDays(Date.now(), startDate) > 0) {
          this.router.navigate([ '.' ], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge',
            queryParams: {
              start_date: format(Date.now(), 'yyyy-MM-dd'),
            },
          });

          return;
        }

        this.s.add(
          this.getList$(paramMap).subscribe(res => this.list$.next(res)),
        );

        this.isPrevDisabled = !paramMap.has('start_date') || isSameDay(startDate, startOfToday()) || isBefore(startDate, startOfToday());
        this.isNextDisabled = isSameDay(startDate, firstDisabledNextStartDate) || isAfter(startDate, firstDisabledNextStartDate);

        this.dates = this.getDates(startDate, isMonthMode);

        this.isMonth = isMonthMode;
        this.currentCastId = paramMap.has('cast_id') ? parseInt(paramMap.get('cast_id') ?? '', 10) : null;
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  getWithoutSeconds(timeString: string) {
    return timeString.substr(0, 5);
  }

  getCurrentDate() {
    return formatDate(Date.now(), 'YYYY-MM-dd', 'ja');
  }

  onClickCreate(date: DateScheduleDetail, cast: TenantCast, setting: TenantCastScheduleSettingResponse) {
    this.modify(date, cast, setting);
  }

  onClickModify(date: DateScheduleDetail, cast: TenantCast, setting: TenantCastScheduleSettingResponse, data: TenantCastScheduleResponse) {
    this.modify(date, cast, setting, data);
  }

  onClickDelete(schedule: TenantCastScheduleResponse) {
    this.s.add(
      this.tenantCastScheduleService.delete(schedule.id)
        .pipe(mergeMap(() => this.getList$(this.activatedRoute.snapshot.queryParamMap)))
        .subscribe(res => this.list$.next(res)),
    );
  }

  onClickPrevWeek() {
    this.router.navigate([ '.' ], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        'start_date': format(
          max([
            subDays(
              this.activatedRoute.snapshot.queryParamMap.has('start_date') ?
                parseISO(this.activatedRoute.snapshot.queryParamMap.get('start_date') ?? '') :
                Date.now(),
              7,
            ),
            Date.now(),
          ]),
          'yyyy-MM-dd',
        ),
      },
    });
  }

  onClickNextWeek() {
    this.router.navigate([ '.' ], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        'start_date': format(
          addDays(
            this.activatedRoute.snapshot.queryParamMap.has('start_date') ?
              parseISO(this.activatedRoute.snapshot.queryParamMap.get('start_date') ?? '') :
              Date.now(),
            7,
          ),
          'yyyy-MM-dd',
        ),
      },
    });
  }

  onClickPrevMonth() {
    this.router.navigate([ '.' ], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        'start_date': format(
          max([
            subMonths(
              this.activatedRoute.snapshot.queryParamMap.has('start_date') ?
                parseISO(this.activatedRoute.snapshot.queryParamMap.get('start_date') ?? '') :
                Date.now(),
              1,
            ),
            Date.now(),
          ]),
          'yyyy-MM-dd',
        ),
      },
    });
  }

  onClickNextMonth() {
    this.router.navigate([ '.' ], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        'start_date': format(
          startOfMonth(
            addMonths(
              this.activatedRoute.snapshot.queryParamMap.has('start_date') ?
                parseISO(this.activatedRoute.snapshot.queryParamMap.get('start_date') ?? '') :
                Date.now(),
              1,
            ),
          ),
          'yyyy-MM-dd',
        ),
      },
    });
  }

  onClickCopyNextDate(date: DateScheduleDetail, cast: TenantCast, setting: TenantCastScheduleSettingResponse, data: TenantCastScheduleResponse) {
    this.s.add(
      this.tenantCastScheduleService.modify({
        ...data,
        finished: false,
        schedule_date: format(addDays(parseISO(date.dateISO), 1), 'yyyy-MM-dd'),
        start_time: data.start_time.substr(0, 5),
        end_time: data.end_time.substr(0, 5),
      })
        .pipe(
          mergeMap(() => this.getList$(this.activatedRoute.snapshot.queryParamMap)),
        )
        .subscribe(res => {
          this.list$.next(res);
        }),
    );
  }

  onSearch(val: string) {
    const reg = new RegExp(`^.*${val}.*$`);
    this.s.add(
      this.casts$.subscribe(res => {
        this.castsSearched$.next(res?.filter(c => reg.test(c.display_name_kana)) ?? []);
      }),
    );
  }

  private getFirstDisabledNextStartDate(isMonth: boolean) {
    const limitDate = addMonths(startOfToday(), 3);

    if (isMonth) {
      return startOfMonth(limitDate);
    } else {
      return subDays(limitDate, 6);
    }
  }

  private getDates(startDateNormalize: Date, isMonth: boolean) {
    const startDate = isMonth ? setDay(startOfMonth(startDateNormalize), 0) : startDateNormalize;
    const endDate = isMonth ? setDay(endOfMonth(startDateNormalize), 6) : addDays(startDateNormalize, 6);

    const dates: DateScheduleDetail[][] = [ [] ];
    const today = startOfToday();
    const lastDay = addMonths(today, 3);

    for (let i = 0; i <= differenceInCalendarDays(endDate, startDate); i++) {
      const date = addDays(startDate, i);
      const week = Math.floor(i / 7);
      if (!dates[week]) {
        dates[week] = [];
      }
      dates[week]?.push({
        dateISO: format(date, 'yyyy-MM-dd'),
        dateString: format(date, 'MM/dd[EEE]'),
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        dayNum: date.getDay(),
        isToday: isToday(date),
        isAvailable: !(isBefore(date, today) || isAfter(date, lastDay)),
      });
    }

    return dates;
  }

  private getList$(paramMap: ParamMap) {
    return this.tenantCastScheduleService.get({
      start_date: paramMap.get('start_date') ?? undefined,
      cast_id: paramMap.has('cast_id') ? parseInt(paramMap.get('cast_id') ?? '0', 10) : undefined,
      month: paramMap.get('month') === '1' ?? undefined,
    });
  }

  private modify(date: DateScheduleDetail, cast: TenantCast, setting: TenantCastScheduleSettingResponse, data?: TenantCastScheduleResponse) {
    const ref = this.matDialog.open<TenantCastScheduleDialogComponent, any, {
      tenant_cast_id: number;
      schedule_date: string;
      start_time: string;
      end_time: string;
      finished: boolean;
      comment: string;
    }>(TenantCastScheduleDialogComponent, {
      data: {
        date,
        cast,
        setting,
        data,
      },
    });
    this.s.add(
      ref.afterClosed()
        .pipe(
          filter((v): v is Exclude<typeof v, undefined> => typeof v !== 'undefined'),
          mergeMap(res => {
            return this.tenantCastScheduleService.modify({
              ...res,
              finished: res.finished ?? false,
            });
          }),
          mergeMap(() => this.getList$(this.activatedRoute.snapshot.queryParamMap)),
        )
        .subscribe(res => {
          this.list$.next(res);
        }),
    );
  }
}
