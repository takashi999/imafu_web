import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-confirm-dialog',
  templateUrl: './operation-confirm-dialog.component.html',
  styleUrls: ['./operation-confirm-dialog.component.scss'],
})
export class OperationConfirmDialogComponent implements OnInit {
  message = '';

  constructor() { }

  ngOnInit(): void {
  }

}
