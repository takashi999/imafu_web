import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-search',
  templateUrl: './dashboard-search.component.html',
  styleUrls: [ './dashboard-search.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSearchComponent implements OnInit {
  @Input() name = '';
  @Output() search = new EventEmitter<string>();

  fc = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
  }

}
