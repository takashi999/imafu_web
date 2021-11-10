import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit , ChangeDetectionStrategy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { fromEvent, Subscription } from 'rxjs';

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

}
