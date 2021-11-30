import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { fromEvent, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-tenant-cast-dashboard-container',
  templateUrl: './tenant-cast-dashboard-container.component.html',
  styleUrls: ['./tenant-cast-dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantCastDashboardContainerComponent implements OnInit {

  opened = window.innerWidth >= 768;
  mode: MatDrawerMode = window.innerWidth >= 768 ? 'side' : 'over';
  sub = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.sub.add(
      fromEvent(window, 'resize')
        .subscribe(() => {
          this.opened = window.innerWidth >= 768;
          this.mode = window.innerWidth >= 768 ? 'side' : 'over';
          this.changeDetectorRef.markForCheck();
        }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
  }

  onClickLogOut() {
    this.tokenService.resetToken('tenantCastToken');
    location.reload();
  }
}
