import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TenantCastAuthService } from 'src/app/services/cast/api/tenant-cast-auth.service';

@Component({
  selector: 'app-tenant-cast-home',
  templateUrl: './tenant-cast-home.component.html',
  styleUrls: ['./tenant-cast-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantCastHomeComponent implements OnInit {

  me$ = this.tenantCastAuthService.me();

  constructor(
    private tenantCastAuthService:TenantCastAuthService
  ) { }

  ngOnInit(): void {
  }

}
