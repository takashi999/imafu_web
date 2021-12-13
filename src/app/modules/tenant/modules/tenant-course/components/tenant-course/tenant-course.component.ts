import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TenantCourseService } from 'src/app/services/tenant/api/tenant-course.service';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tenant-course',
  templateUrl: './tenant-course.component.html',
  styleUrls: [ './tenant-course.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCourseComponent implements OnInit, OnDestroy {

  list$: Subject<any[]> = new Subject();
  s = new Subscription();
  columns: TableListColumnType<any>[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: 'コース名',
    },
  ];

  constructor(
    private tenantCourseService: TenantCourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNameFn = (v: any) => v.title;

  ngOnInit(): void {
    this.s.add(
      this.tenantCourseService.list()
        .subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onClickRow(data: any) {
    this.router.navigate([ data.id ], {
      relativeTo: this.activatedRoute,
    });
  }
}
