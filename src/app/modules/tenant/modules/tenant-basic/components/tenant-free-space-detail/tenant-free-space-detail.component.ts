import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength100000Validator, maxLength40Validator } from 'src/app/validators/common-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeSpaceService } from 'src/app/services/tenant/api/tenant-free-space.service';

@Component({
  selector: 'app-tenant-free-space-detail',
  templateUrl: './tenant-free-space-detail.component.html',
  styleUrls: [ './tenant-free-space-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeSpaceDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    editable_text_type_id: new FormControl('', [ Validators.required ]),
    content: new FormControl('', [ maxLength100000Validator ]),
  });
  id$ = this.activatedRoute.paramMap.pipe(map(m => parseInt(m.get('freeSpaceId') ?? '', 10)));
  detail$ = new Subject<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeSpaceService: TenantFreeSpaceService,
  ) {
  }

  ngOnInit(): void {
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
