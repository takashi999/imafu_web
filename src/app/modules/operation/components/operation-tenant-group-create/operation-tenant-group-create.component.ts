import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationTenantGroupService } from 'src/app/services/operation/api/operation-tenant-group.service';
import { maxLength100Validator } from 'src/app/validators/common-validators';

@Component({
  selector: 'app-operation-tenant-group-create',
  templateUrl: './operation-tenant-group-create.component.html',
  styleUrls: [ './operation-tenant-group-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationTenantGroupCreateComponent implements OnInit, OnDestroy {

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
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.operationTenantGroupService.create(this.fg.value)
        .subscribe(res => {
          this.router.navigateByUrl('/operation/tenant-groups');
        }),
    );
  }
}
