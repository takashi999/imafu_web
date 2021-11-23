import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';
import { TenantBasicService } from 'src/app/services/tenant/api/tenant-basic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tenant-app-container',
  templateUrl: './tenant-app-container.component.html',
  styleUrls: [ './tenant-app-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantAppContainerComponent implements OnInit {

  tenantLink$ = this.tenantBasicService.tenantId$.pipe(
    filter((v): v is Exclude<typeof v, null> => v !== null),
    map(v => this.domSanitizer.bypassSecurityTrustResourceUrl(`${ environment.serverUrl }/shop/${ v }`)),
  );

  constructor(
    public tenantAuthService: TenantAuthService,
    public tenantBasicService: TenantBasicService,
    private domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.tenantBasicService.get().subscribe();
  }

}
