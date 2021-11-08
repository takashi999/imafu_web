import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OperationConfirmDialogComponent } from 'src/app/modules/operation/components/operation-confirm-dialog/operation-confirm-dialog.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: MatDialogModule,
})
export class OperationConfirmService {

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  open(message: string) {
    return new Observable<true>(subscriber => {
      const ref = this.matDialog.open(OperationConfirmDialogComponent);
      ref.componentInstance.message = message;
      subscriber.add(
        ref.afterClosed()
          .pipe(
            map(res => !!res),
          )
          .subscribe(res => {
            if (res) {
              subscriber.next(res);
            }
            subscriber.complete();
          }),
      );
    });
  }
}
