import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';
import { OperationAuthService } from 'src/app/services/operation/api/operation-auth.service';

@Component({
  selector: 'app-operation-app-container',
  templateUrl: './operation-app-container.component.html',
  styleUrls: ['./operation-app-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationAppContainerComponent implements OnInit {

  constructor(
    public operationAuthService:OperationAuthService
  ) { }

  ngOnInit(): void {
  }

}
