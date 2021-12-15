import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TenantLayoutService } from 'src/app/services/tenant/api/tenant-layout.service';
import { BehaviorSubject, forkJoin, ObservedValueOf, Subscription } from 'rxjs';
import { filter, multicast } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { TenantLayoutTopComponent } from 'src/app/modules/tenant/modules/tenant-layout/components/tenant-layout-top/tenant-layout-top.component';

@Component({
  selector: 'app-tenant-layout-other',
  templateUrl: './tenant-layout-other.component.html',
  styleUrls: [ './tenant-layout-other.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLayoutOtherComponent implements OnInit {
  s = new Subscription();

  contents$ = this.tenantMasterService.layoutContents();
  detail$ = this.tenantLayoutService.get();

  viewSubject = new BehaviorSubject<{
    contents: ObservedValueOf<TenantLayoutTopComponent['contents$']>,
    detail: ObservedValueOf<TenantLayoutTopComponent['detail$']>,
  } | null>(null);
  view$ = multicast(this.viewSubject)(
    forkJoin({
      contents: this.contents$,
      detail: this.detail$,
    }),
  );

  relationsFa = new FormArray([]);
  fg = new FormGroup({
    relations: this.relationsFa,
    right_side_tenant_layout_contents_type_id: new FormControl(null),
  });

  contentsSelect: { value: any; label: string; }[] = [];

  constructor(
    private tenantLayoutService: TenantLayoutService,
    private tenantMasterService: TenantMasterService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.view$.connect());
    this.s.add(this.view$
      .pipe(filter((v): v is Exclude<typeof v, null> => v !== null))
      .subscribe(res => {
        this.contentsSelect = [
          {
            value: '',
            label: '非公開',
          },
          ...res.contents.map(c => ({
            value: c.id,
            label: c.display_name,
          })),
        ];

        this.fg.patchValue({
          right_side_tenant_layout_contents_type_id: res.detail.right_side_tenant_layout_contents_type_id ?? '',
        }, { emitEvent: false });
      }));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.tenantLayoutService.modifySideContent(this.fg.value)
        .subscribe(res => {
          const val = this.viewSubject.getValue();
          if (val) {
            val.detail = res;
          }
          this.viewSubject.next(val);
        }),
    );
  }
}
