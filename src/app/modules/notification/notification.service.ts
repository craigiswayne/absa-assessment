import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarRef} from '@angular/material/snack-bar/snack-bar-ref';
import {TextOnlySnackBar} from '@angular/material/snack-bar/simple-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly snackBar: MatSnackBar) {}

  public show(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, 'OK', {
      duration: 1000 * 3
    });
  }
}
