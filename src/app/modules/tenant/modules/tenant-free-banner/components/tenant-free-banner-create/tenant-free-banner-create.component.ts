import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxLength35Validator } from 'src/app/validators/common-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantFreeBannerService } from 'src/app/services/tenant/api/tenant-free-banner.service';
import { TenantMasterService } from 'src/app/services/tenant/api/tenant-master.service';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-tenant-free-banner-create',
  templateUrl: './tenant-free-banner-create.component.html',
  styleUrls: [ './tenant-free-banner-create.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantFreeBannerCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  s = new Subscription();
  files: (File | number)[] = [];

  displaySpaces$ = this.tenantMasterService.freeBannerDisplaySpaces().pipe(
    map(res => res.map(r => ({ value: r.id, label: r.display_name }))),
  );

  fg = new FormGroup({
    publish: new FormControl('0'),
    title: new FormControl('', [ Validators.required, maxLength35Validator ]),
    tenant_free_banner_display_space_id: new FormControl(''),
    images: new FormControl([]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tenantFreeBannerService: TenantFreeBannerService,
    private tenantMasterService: TenantMasterService,
    private formDataService: FormDataService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.s.unsubscribe();
  }

  onSub() {
    const req = this.formDataService.getFormData(this.fg.value);

    if (this.files) {
      this.files.forEach((f, i) => {
        if (typeof f === 'number') {
          req.set(`images[${ i }][id]`, f.toString(10));
        } else if (f instanceof File) {
          req.set(`images[${ i }][image]`, f);
        }
      });
    } else {
      req.set('images', '');
    }

    this.s.add(
      this.tenantFreeBannerService.create(req)
        .subscribe(() => this.router.navigate([ '../' ], {
          relativeTo: this.activatedRoute,
        })),
    );
  }
}
