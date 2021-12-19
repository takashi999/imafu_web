import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TenantLayoutService } from 'src/app/services/tenant/api/tenant-layout.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, forkJoin, ObservedValueOf, Subscription } from 'rxjs';
import { filter, multicast } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TenantRankingService } from 'src/app/services/tenant/api/tenant-ranking.service';

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
  rankings$ = this.tenantRankingService.list();

  viewSubject = new BehaviorSubject<{
    modules: ObservedValueOf<TenantLayoutTopComponent['modules$']>,
    contents: ObservedValueOf<TenantLayoutTopComponent['contents$']>,
    detail: ObservedValueOf<TenantLayoutTopComponent['detail$']>,
    rankings: ObservedValueOf<TenantLayoutTopComponent['rankings$']>,
  } | null>(null);
  view$ = multicast(this.viewSubject)(
    forkJoin({
      modules: this.modules$,
      contents: this.contents$,
      detail: this.detail$,
      rankings: this.rankings$,
    }),
  );

  relationsFa = new FormArray([]);
  fg = new FormGroup({
    relations: this.relationsFa,
    side_tenant_layout_contents_type_id: new FormControl(null),
    side_tenant_layout_contents_ranking: new FormControl(null),
  });
  enableFormControlsMap: { [moduleId: number]: FormControl; } = {};

  center: { id: number; display_name: string; is_wide: boolean }[] = [];
  contentsSelect: { value: any; label: string; }[] = [];
  rankingSelect: { value: any; label: string; }[] = [];
  selectedContentsTypeIdString = '';

  constructor(
    private tenantLayoutService: TenantLayoutService,
    private tenantMasterService: TenantMasterService,
    private tenantRankingService: TenantRankingService,
  ) {
  }

  ngOnInit(): void {
    this.s.add(this.view$.connect());
    this.s.add(this.view$
      .pipe(filter((v): v is Exclude<typeof v, null> => v !== null))
      .subscribe(res => {
        this.center = res.detail.modules
          .map(m => res.modules.find(r => r.id === m.tenant_layout_module_type_id))
          .filter((v): v is Exclude<typeof v, undefined> => typeof v !== 'undefined');


        this.contentsSelect = [
          ...res.contents.map(c => ({
            value: c.id.toString(10),
            label: c.display_name,
          })),
        ];

        this.rankingSelect = res.rankings.map(r => ({
          value: r.id.toString(),
          label: r.title,
        }));

        res.detail.modules.forEach(v => {
          const fc = new FormControl(v.is_enabled === 1);
          this.s.add(
            fc.valueChanges.subscribe(() => {
              this.updateFormValue();
            }),
          );
          this.enableFormControlsMap[v.tenant_layout_module_type_id] = fc;
        });

        this.updateFormValue();


        this.fg.get('side_tenant_layout_contents_type_id')?.valueChanges.subscribe(val => {
          this.selectedContentsTypeIdString = res.contents.find(c => c.id.toString(10) === val)?.type_id ?? '';
          if (this.selectedContentsTypeIdString !== 'ranking') {
            this.fg.get('side_tenant_layout_contents_ranking')?.setValue(null, { emitEvent: false });
          }
        });
        this.fg.patchValue({
          side_tenant_layout_contents_type_id: res.detail.side_tenant_layout_contents_type_id.toString(10),
          side_tenant_layout_contents_ranking: res.detail.ranking?.tenant_ranking_id.toString(10) ?? null,
        });
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
    this.center.forEach(v => {
      this.relationsFa.push(new FormGroup({
        tenant_layout_module_type_id: new FormControl(v.id),
        is_enabled: this.enableFormControlsMap[v.id],
      }));
    });
  }
}
