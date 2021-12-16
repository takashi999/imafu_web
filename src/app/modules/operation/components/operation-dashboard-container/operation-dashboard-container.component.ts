import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { fromEvent, Subscription } from 'rxjs';
import { OperationAuthService } from 'src/app/services/operation/api/operation-auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-operation-dashboard-container',
  templateUrl: './operation-dashboard-container.component.html',
  styleUrls: [ './operation-dashboard-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationDashboardContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  opened = window.innerWidth >= 768;
  mode: MatDrawerMode = window.innerWidth >= 768 ? 'side' : 'over';
  sub = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private operationAuthService: OperationAuthService,
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

  onClickLogout() {
    this.sub.add(
      this.operationAuthService.logout()
        .subscribe(() => {
          this.tokenService.resetToken('operationToken');
          location.reload();
        }),
    );
  }
}
