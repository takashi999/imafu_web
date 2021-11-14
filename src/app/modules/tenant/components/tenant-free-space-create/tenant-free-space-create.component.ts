import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeSpaceService } from 'src/app/services/tenant/api/tenant-free-space.service';
import { maxLength100000Validator, maxLength40Validator } from 'src/app/validators/common-validators';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { map } from 'rxjs/operators';
import { EditableTextTypes } from 'src/app/services/tenant/api/responses';

@Component({
  selector: 'app-tenant-free-space-create',
  templateUrl: './tenant-free-space-create.component.html',
  styleUrls: [ './tenant-free-space-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeSpaceCreateComponent implements OnInit, OnDestroy, AfterViewInit {

  typeStr: { [type: string]: string } = {
    plain: 'プレーンテキスト',
    html: 'HTML',
  };
  typesRaw$ = new Subject<EditableTextTypes>();
  types$ = this.typesRaw$.pipe(
    map(res => {
      return res.map(r => ({
        value: r.id.toString(10),
        label: this.typeStr[r.type] + '形式',
      }));
    }),
  );
  s = new Subscription();
  fg = new FormGroup({
    title: new FormControl('', [ Validators.required, maxLength40Validator ]),
    editable_text_type_id: new FormControl('', [ Validators.required ]),
    content: new FormControl('', [ maxLength100000Validator ]),
  });

  currentType = 'plain';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeSpaceService: TenantFreeSpaceService,
    private tenantMasterService: TenantMasterService,
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
                this.currentType = res.find(r => r.id === parseInt(idStr, 10))?.type ?? 'plain';
              }),
          );
        }),
    );
  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    this.s.add(
      this.tenantFreeSpaceService.create(this.fg.value)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }

}
