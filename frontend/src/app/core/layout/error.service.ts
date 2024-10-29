import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../shared/ui/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dialog: MatDialog) {}

  handleError(error: any): void {
    this.dialog.open(ErrorModalComponent, {
      data: {
        message: error,
      },
    });
  }
}
