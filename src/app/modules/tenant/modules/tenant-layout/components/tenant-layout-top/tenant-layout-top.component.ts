import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantLayoutService } from 'src/app/services/tenant/api/tenant-layout.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, forkJoin, ObservedValueOf, Subscription } from 'rxjs';
import { filter, multicast } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tenant-layout-top',
  templateUrl: './tenant-layout-top.component.html',
  styleUrls: [ './tenant-layout-top.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantLayoutTopComponent implements OnInit, OnDestroy {
  s = new Subscription();

  modules$ = this.tenantMasterService.layoutModules();
  contents$ = this.tenantMasterService.layoutContents();
  detail$ = this.tenantLayoutService.get();

  viewSubject = new BehaviorSubject<{
    modules: ObservedValueOf<TenantLayoutTopComponent['modules$']>,
    contents: ObservedValueOf<TenantLayoutTopComponent['contents$']>,
    detail: ObservedValueOf<TenantLayoutTopComponent['detail$']>,
  } | null>(null);
  view$ = multicast(this.viewSubject)(
    forkJoin({
      modules: this.modules$,
      contents: this.contents$,
      detail: this.detail$,
    }),
  );

  relationsFa = new FormArray([]);
  fg = new FormGroup({
    relations: this.relationsFa,
    top_right_side_tenant_layout_contents_type_id: new FormControl(null),
  });
  enableFormControlsMap: { [moduleId: number]: FormControl; } = {};

  left: { id: number; display_name: string; is_wide: boolean }[] = [];
  center: { id: number; display_name: string; is_wide: boolean }[] = [];
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
        this.left = res.detail.modules
          .filter(m => m.is_side === 1)
          .map(m => res.modules.find(r => r.id === m.tenant_layout_module_type_id))
          .filter((v): v is Exclude<typeof v, undefined> => typeof v !== 'undefined');
        this.center = res.detail.modules
          .filter(m => m.is_side === 0)
          .map(m => res.modules.find(r => r.id === m.tenant_layout_module_type_id))
          .filter((v): v is Exclude<typeof v, undefined> => typeof v !== 'undefined');


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

        res.detail.modules.forEach(v => {
          const fc = new FormControl(v.is_enabled === 1);
          this.s.add(
            fc.valueChanges.subscribe(res => {
              this.updateFormValue();
            }),
          );
          this.enableFormControlsMap[v.tenant_layout_module_type_id] = fc;
        });

        this.updateFormValue();

        this.fg.patchValue({
          top_right_side_tenant_layout_contents_type_id: res.detail.top_right_side_tenant_layout_contents_type_id ?? '',
        }, { emitEvent: false });
      }));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  drop(event: CdkDragDrop<{ id: number; display_name: string; is_wide: boolean }[], { id: number; display_name: string; is_wide: boolean }[], { id: number; display_name: string; is_wide: boolean }>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.updateFormValue();
  }

  allAcceptPredicate() {
    return true;
  }

  thinPredicate(item: CdkDrag<{ id: number; display_name: string; is_wide: boolean }>) {
    return !item.data.is_wide;
  }

  onSub() {
    this.s.add(
      this.tenantLayoutService.modifyModules(this.fg.value)
        .subscribe(res => {
          const val = this.viewSubject.getValue();
          if (val) {
            val.detail = res;
          }
          this.viewSubject.next(val);
        }),
    );
  }

  private updateFormValue() {
    this.relationsFa.clear({ emitEvent: false });
    this.left.forEach(v => {
      this.relationsFa.push(new FormGroup({
        is_side: new FormControl(true),
        tenant_layout_module_type_id: new FormControl(v.id),
        is_enabled: this.enableFormControlsMap[v.id],
      }));
    });
    this.center.forEach(v => {
      this.relationsFa.push(new FormGroup({
        is_side: new FormControl(false),
        tenant_layout_module_type_id: new FormControl(v.id),
        is_enabled: this.enableFormControlsMap[v.id],
      }));
    });
  }
}
