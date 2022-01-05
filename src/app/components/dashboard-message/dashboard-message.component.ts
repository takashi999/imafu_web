import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-message',
  templateUrl: './dashboard-message.component.html',
  styleUrls: [ './dashboard-message.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMessageComponent implements OnInit {
  @Input() head = '';
  @Input() subHead = '';
  @Input() annotation = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
