import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-tip',
  templateUrl: './dashboard-tip.component.html',
  styleUrls: ['./dashboard-tip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
