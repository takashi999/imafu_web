import { Component, OnInit } from '@angular/core';
import { TenantAuthService } from 'src/app/services/tenant/api/tenant-auth.service';

@Component({
  selector: 'app-tenant-app-container',
  templateUrl: './tenant-app-container.component.html',
  styleUrls: [ './tenant-app-container.component.scss' ],
})
export class TenantAppContainerComponent implements OnInit {

  constructor(
    public tenantAuthService: TenantAuthService,
  ) {
  }

  ngOnInit(): void {
  }

}
