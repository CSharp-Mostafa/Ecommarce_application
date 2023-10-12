import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'ok') {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.verticalPosition = 'bottom'; // Set the vertical position to 'middle'

    this._snackBar.open(message, action, config);
}
}