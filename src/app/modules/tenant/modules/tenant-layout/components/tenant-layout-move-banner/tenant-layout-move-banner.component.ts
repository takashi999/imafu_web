import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TenantLayoutService } from 'src/app/services/tenant/api/tenant-layout.service';

@Component({
  selector: 'app-tenant-layout-move-banner',
  templateUrl: './tenant-layout-move-banner.component.html',
  styleUrls: ['./tenant-layout-move-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantLayoutMoveBannerComponent implements OnInit {

  constructor(
    private tenantLayoutService: TenantLayoutService,
  ) { }

  ngOnInit(): void {
  }

}
