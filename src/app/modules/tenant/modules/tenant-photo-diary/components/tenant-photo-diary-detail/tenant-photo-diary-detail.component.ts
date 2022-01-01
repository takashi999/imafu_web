import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subscription } from 'rxjs';
import { EditableTextTypes, TenantCastPhotoDiary } from 'src/app/services/tenant/api/responses';
import { TenantCastPhotoDiaryService } from 'src/app/services/tenant/api/tenant-cast-photo-diary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength20000Validator, maxLength300Validator } from 'src/app/validators/common-validators';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';

@Component({
  selector: 'app-tenant-photo-diary-detail',
  templateUrl: './tenant-photo-diary-detail.component.html',
  styleUrls: [ './tenant-photo-diary-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantPhotoDiaryDetailComponent implements OnInit, OnDestroy {
  s = new Subscription();
  view$ = new BehaviorSubject<{
    detail?: TenantCastPhotoDiary;
    editableTextTypes?: EditableTextTypes;
  } | null>(null);
  id$: Observable<number | null> = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('photoDiaryId') ?? '', 10)));
  detail$ = this.id$.pipe(filter((v): v is Exclude<typeof v, null> => v !== null && !isNaN(v)), mergeMap(id => this.tenantCastPhotoDiaryService.get(id)));
  editableTextTypes$ = this.tenantMasterService.editableTextTypes();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength300Validator ]),
    editable_text_type_id: new FormControl(''),
    content: new FormControl('', [ maxLength20000Validator ]),
    images: new FormArray([]),
  });
  textTypeSelects: { value: string; label: string; }[] = [];
  selectedTextType: 'plain' | 'html' | string = 'plain';

  imageUrls: string[] = [];

  constructor(
    private tenantCastPhotoDiaryService: TenantCastPhotoDiaryService,
    private tenantMasterService: TenantMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.detail$.subscribe(res => {
        this.view$.next({
          ...this.view$.getValue(),
          detail: res,
        });

        (this.fg.get('images') as FormArray).clear();
        res.images?.forEach(() => {
          (this.fg.get('images') as FormArray).push(new FormControl());
        });


        this.fg.patchValue({
          title: res.title,
          editable_text_type_id: res.editable_text_type_id.toString(10),
          content: res.content,
          images: res.images?.map(v => ({ id: v.id })),
        });

        this.imageUrls = res.images?.map(v => v.file_url) ?? [];
      }),
    );
    this.s.add(
      this.editableTextTypes$.subscribe(res => {
        this.view$.next({
          ...this.view$.getValue(),
          editableTextTypes: res,
        });
        this.textTypeSelects = res.map(r => ({
          value: r.id.toString(10),
          label: { plain: 'プレーンテキスト', html: 'HTML' }[r.type] + '形式',
        }));
      }),
    );

    this.s.add(
      combineLatest(
        this.fg.get('editable_text_type_id')?.valueChanges ?? EMPTY,
        this.editableTextTypes$,
      ).subscribe(([ id, types ]) => {
        this.selectedTextType = types.find(t => t.id === parseInt(id, 10))?.type ?? 'plain';
        this.changeDetectorRef.markForCheck();
      }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(data: TenantCastPhotoDiary | undefined) {
    if (data) {
      this.s.add(this.tenantCastPhotoDiaryService.modify(data.id, this.fg.value).subscribe((res) => {
        this.router.navigate([ '../' ], { relativeTo: this.activatedRoute });
      }));
    }
  }
}
