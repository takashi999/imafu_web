import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { EditableTextTypes } from 'src/app/services/tenant/api/responses';
import { map, mergeMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength100000Validator, maxLength40Validator } from 'src/app/validators/common-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeSpaceService } from 'src/app/services/tenant/api/tenant-free-space.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';

@Component({
  selector: 'app-tenant-free-space-detail',
  templateUrl: './tenant-free-space-detail.component.html',
  styleUrls: [ './tenant-free-space-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeSpaceDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  typeStr: { [type: string]: string } = {
    plain: 'プレーンテキスト',
    html: 'HTML',
  };
  typesRaw$ = new BehaviorSubject<EditableTextTypes | null>(null);
  types$ = this.typesRaw$.pipe(
    map(res => {
      return res?.map(r => ({
        value: r.id.toString(10),
        label: this.typeStr[r.type] + '形式',
      })) ?? null;
    }),
  );
  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    editable_text_type_id: new FormControl('', [ Validators.required ]),
    content: new FormControl('', [ maxLength100000Validator ]),
  });
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('freeSpaceId') ?? '', 10)));
  detail$ = new Subject<any>();
  editableTextTypeId$ = new Subject<number>();

  currentType = 'plain';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeSpaceService: TenantFreeSpaceService,
    private tenantMasterService: TenantMasterService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.tenantMasterService.editableTextTypes()
        .subscribe(res => {
          this.typesRaw$.next(res);

          this.s.add(
            this.fg.get('editable_text_type_id')?.valueChanges
              .subscribe(idStr => {
                this.editableTextTypeId$.next(parseInt(idStr, 10));
              }),
          );
        }),
    );

    this.s.add(
      combineLatest([
        this.typesRaw$,
        this.editableTextTypeId$,
      ]).subscribe(([ types, id ]) => {
        this.currentType = types?.find(r => r.id === id)?.type ?? 'plain';
      }),
    );

    this.s.add(
      this.id$.pipe(
        mergeMap(id => this.tenantFreeSpaceService.get(id)),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$.subscribe(res => {
        this.fg.patchValue({
          ...res,
          editable_text_type_id: res.editable_text_type_id.toString(10),
        }, { emitEvent: false });

        this.editableTextTypeId$.next(res.editable_text_type_id);
      }),
    );
  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(id: number) {
    this.s.add(
      this.tenantFreeSpaceService.modify(id, this.fg.value)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

}
