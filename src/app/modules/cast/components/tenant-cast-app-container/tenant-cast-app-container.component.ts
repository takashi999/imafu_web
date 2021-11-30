import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';
import { TenantBasicService } from 'src/app/services/tenant/api/tenant-basic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TenantCastAuthService } from 'src/app/services/cast/api/tenant-cast-auth.service';

@Component({
  selector: 'app-tenant-cast-app-container',
  templateUrl: './tenant-cast-app-container.component.html',
  styleUrls: ['./tenant-cast-app-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantCastAppContainerComponent implements OnInit {

  constructor(
    public tenantCastAuthService: TenantCastAuthService,
  ) {
  }

  ngOnInit(): void {

  }

}
