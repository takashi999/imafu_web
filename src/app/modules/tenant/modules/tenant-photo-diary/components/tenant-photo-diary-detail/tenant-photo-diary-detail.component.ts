import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TenantCastPhotoDiary } from 'src/app/services/tenant/api/responses';
import { TenantCastPhotoDiaryService } from 'src/app/services/tenant/api/tenant-cast-photo-diary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength20000Validator, maxLength300Validator } from 'src/app/validators/common-validators';

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
  } | null>(null);
  id$: Observable<number | null> = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('photoDiaryId') ?? '', 10)));
  detail$ = this.id$.pipe(filter((v): v is Exclude<typeof v, null> => v !== null && !isNaN(v)), mergeMap(id => this.tenantCastPhotoDiaryService.get(id)));
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength300Validator ]),
    editable_text_type_id: new FormControl('', [ Validators.required ]),
    content: new FormControl('', [ maxLength20000Validator ]),
    images: new FormArray([]),
  });

  imageUrls: string[] = [];

  constructor(
    private tenantCastPhotoDiaryService: TenantCastPhotoDiaryService,
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
