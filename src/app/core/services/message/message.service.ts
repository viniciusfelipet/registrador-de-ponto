import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  success(msg: string) {
    this.show(msg, 'success')
  }

  warning(msg: string) {
    this.show(msg, 'warning')
  }

  private show(msg: string, panelClass: string) {
    this.snackBar.open(msg, undefined, { panelClass: panelClass })
  }
}
