import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: [ './dashboard-header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent implements OnInit {
  @Input() routerLink: any[] | string | null | undefined = null;
  @Input() prevRouterLink: any[] | string | null | undefined = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
