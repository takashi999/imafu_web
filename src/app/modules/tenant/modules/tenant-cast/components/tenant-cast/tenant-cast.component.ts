import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TableListColumnType } from 'src/app/components/table-list/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantCastService } from 'src/app/services/tenant/api/tenant-cast.service';
import { TenantCast } from 'src/app/services/tenant/api/responses';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tenant-cast',
  templateUrl: './tenant-cast.component.html',
  styleUrls: [ './tenant-cast.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCastComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('recommend') recommendTemplate?: TemplateRef<any>;

  list$: Subject<any[]> = new Subject();
  s = new Subscription();
  columns: TableListColumnType<TenantCast>[] = [];

  constructor(
    private tenantCastService: TenantCastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
  ) {
  }

  getNameFn = (v: any) => v.display_name;

  ngOnInit(): void {
    this.s.add(
      this.tenantCastService.list()
        .subscribe(res => this.list$.next(res)),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  ngAfterViewInit() {
    this.columns = [
      {
        key: 'id',
        label: 'ID',
      },
      {
        key: 'recommend',
        label: 'オススメガール',
        templateRef: this.recommendTemplate,
        type: 'template',
      },
      {
        key: 'display_name',
        label: '名前',
      },
      {
        key: 'publish_at',
        label: '公開',
        transform: (v: string | null) => v !== null ? '公開' : '非公開',
      },
      {
        key: 'delete',
      },
    ];
  }

  onClickRow(data: any) {
    this.router.navigate([ data.id ], {
      relativeTo: this.activatedRoute,
    });
  }

  onClickRecommend(e: MouseEvent, data: TenantCast) {
    e.stopPropagation();
    e.preventDefault();

    this.s.add(
      this.tenantCastService.recommend(data.id, {
        recommend: !data.is_recommend,
      })
        .subscribe(res => {
          this.list$.next(res);
        }, (error: HttpErrorResponse) => {
          const message = error?.error?.errors?.recommend?.[0];
          if (message) {
            this.matSnackBar.open(message, '閉じる', {
              duration: 3000,
            });
          }
        }),
    );
  }

  onDelete(data: TenantCast) {
    this.s.add(
      this.tenantCastService.delete(data.id).subscribe(res => {
        this.list$.next(res);
      }),
    );
  }
}
