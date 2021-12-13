import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantCourseService } from 'src/app/services/tenant/api/tenant-course.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  maxLength40Validator,
  maxLength500Validator,
  maxLength64Validator,
} from 'src/app/validators/common-validators';

@Component({
  selector: 'app-tenant-course-create',
  templateUrl: './tenant-course-create.component.html',
  styleUrls: [ './tenant-course-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantCourseCreateComponent implements OnInit, OnDestroy {

  formArrayMax = 20;
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

  onSub() {
    this.s.add(
      this.tenantCourseService.create(this.fg.value)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

}
