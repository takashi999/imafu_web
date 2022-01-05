import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, combineLatest, isObservable, Observable, Subject, Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';

@Component({
  selector: 'app-dashboard-table-tab',
  templateUrl: './dashboard-table-tab.component.html',
  styleUrls: [ './dashboard-table-tab.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTableTabComponent<T, TE = any, TK extends (keyof T) = keyof T> implements OnInit, OnDestroy {

  s = new Subscription();

  @Input() displayedColumns: TableListColumnType<T, TE>[] = [];
  @Input() sortChangeable = false;

  @Output() delete: EventEmitter<T> = new EventEmitter<T>();
  @Output() clickRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() changeSort = new EventEmitter<CdkDragDrop<T, T, T>>();


  dataSourceSubject: Subject<readonly T[] | Observable<readonly T[]> | null> = new BehaviorSubject<readonly T[] | Observable<readonly T[]> | null>(null);
  tabKeySubject: Subject<TK | null> = new BehaviorSubject<TK | null>(null);
  tabKeyDisplayNameMasterSubject: Subject<({ id: number; display_name: string }[]) | null> = new BehaviorSubject<({ id: number; display_name: string }[]) | null>(null);

  private splitDataSourceSubject = new BehaviorSubject<{ [key: number]: readonly T[] | undefined }>({});
  public splitDataSource$: Observable<{ [p: number]: readonly T[] | undefined }> = this.splitDataSourceSubject.asObservable();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  @Input() set dataSource(val: readonly T[] | Observable<readonly T[]> | null) {
    if (val !== null) {
      this.dataSourceSubject.next(val);
    }
  };

  @Input() set tabKey(val: TK | null) {
    this.tabKeySubject.next(val);
  };

  @Input() set tabKeyDisplayNameMaster(val: ({ id: number; display_name: string }[]) | null) {
    this.tabKeyDisplayNameMasterSubject.next(val);
  };

  @Input() getNameFn: (val: T) => string = val => `${ val }`;

  ngOnInit(): void {
    this.s.add(
      combineLatest([
        this.dataSourceSubject,
        this.tabKeySubject,
        this.tabKeyDisplayNameMasterSubject,
      ])
        .subscribe(([ dataSource, tabKey, tabKeyDisplayNameMaster ]) => {
          const subscriber = this.splitDataSourceSubject;

          if (tabKey === null || tabKeyDisplayNameMaster === null) {
            subscriber.next({});
            return;
          }

          if (isObservable(dataSource)) {
            this.s.add(
              dataSource.subscribe(res => {
                subscriber.next(this.getSplitByResource(res, tabKey));
              }),
            );
          } else if (dataSource === null || typeof dataSource === 'undefined') {
            subscriber.next({});
          } else {
            subscriber.next(this.getSplitByResource(dataSource, tabKey));
          }
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  private getSplitByResource(res: readonly T[], tabKey: TK) {
    return res.reduce((ac, c) => {
      const id = c[tabKey];
      if (typeof id === 'number') {
        if (!ac[id]) {
          ac[id] = [];
        }

        ac[id].push(c);
      }
      return ac;
    }, {} as { [key: number]: T[] });
  }
}
