import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { fromEvent, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-tenant-dashboard-container',
  templateUrl: './tenant-dashboard-container.component.html',
  styleUrls: [ './tenant-dashboard-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantDashboardContainerComponent implements OnInit, OnDestroy, AfterViewInit {

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
    this.tokenService.resetToken('tenantToken');
    location.reload();
  }

}
