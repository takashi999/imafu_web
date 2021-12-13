import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantCourseService } from 'src/app/services/tenant/api/tenant-course.service';
import { map, mergeMap } from 'rxjs/operators';
import {
  maxLength40Validator,
  maxLength500Validator,
  maxLength64Validator,
} from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-course-detail',
  templateUrl: './tenant-course-detail.component.html',
  styleUrls: [ './tenant-course-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCourseDetailComponent implements OnInit, OnDestroy {

  formArrayMax = 20;
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('courseId') ?? '', 10)));
  detail$ = new Subject<any>();
  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    note: new FormControl('', [ maxLength500Validator ]),
    courses: new FormArray(
      new Array(1).fill(0).map(() => new FormGroup({
        head: new FormControl('', [ maxLength64Validator ]),
        data: new FormControl('', [ maxLength64Validator ]),
      })),
    ),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantCourseService: TenantCourseService,
  ) {
  }

  get courseFormArray() {
    return this.fg.get('courses') as FormArray;
  }

  ngOnInit(): void {
    this.s.add(
      this.id$.pipe(
        mergeMap(id => this.tenantCourseService.get(id)),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$
        .subscribe(res => {
          this.fg.reset();
          this.courseFormArray.clear();
          res.courses.forEach(() => {
            this.courseFormArray.push(
              new FormGroup({
                head: new FormControl('', [ maxLength64Validator ]),
                data: new FormControl('', [ maxLength64Validator ]),
              }),
            );
          });
          this.fg.patchValue(res, { emitEvent: false });
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onPush() {
    this.courseFormArray.push(
      new FormGroup({
        head: new FormControl('', [ maxLength64Validator ]),
        data: new FormControl('', [ maxLength64Validator ]),
      }),
    );
  }

  onSub(id: number) {
    this.s.add(
      this.tenantCourseService.modify(id, this.fg.value)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }
}
