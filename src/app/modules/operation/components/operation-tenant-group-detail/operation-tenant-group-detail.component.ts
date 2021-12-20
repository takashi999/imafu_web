import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { OperationTenantGroupService } from 'src/app/services/operation/api/operation-tenant-group.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperationTenantGroup } from 'src/app/services/operation/api/responses';
import { maxLength100Validator } from 'src/app/validators/common-validators';

@Component({
  selector: 'app-operation-tenant-group-detail',
  templateUrl: './operation-tenant-group-detail.component.html',
  styleUrls: [ './operation-tenant-group-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantGroupDetailComponent implements OnInit, OnDestroy {

  detail$: Subject<OperationTenantGroup> = new Subject<OperationTenantGroup>();

  s = new Subscription();
  fg = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      maxLength100Validator,
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operationTenantGroupService: OperationTenantGroupService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.s.add(
      this.activatedRoute.paramMap.pipe(
        mergeMap((paramMap): Observable<OperationTenantGroup> => {
          const id = parseInt(paramMap.get('tenant_group_id') ?? '', 10);
          if (isNaN(id)) {
            this.router.navigateByUrl('/operation/tenant-groups');
            return of();
          }

          return this.operationTenantGroupService.get(id);
        }),
      )
        .subscribe(res => {
          this.detail$.next(res);
        }),
    );

    this.s.add(
      this.detail$
        .subscribe(res => {
          this.fg.patchValue({
            ...res,
          }, { emitEvent: false });
        }),
    );
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub(id: number) {
    this.s.add(
      this.operationTenantGroupService.modify(id, this.fg.value)
        .subscribe(res => {
          this.router.navigateByUrl('/operation/tenant-groups');
        }),
    );
  }
}
