import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  static handleErrorPromise(error: HttpErrorResponse, msgDefault: string) {
    return this.getErrorMessage(error, msgDefault)
  }

  static handleErrorObservable(error: HttpErrorResponse, msgDefault: string) {
    return throwError(this.getErrorMessage(error, msgDefault))
  }

  static getErrorMessage(error: HttpErrorResponse, msgDefault: string) {
    console.log(error)
    let errorMsg: string = "";
          
    if (error.status === 0) {
      // Client side error
      errorMsg = "Não foi possível realizar conexão com o servidor, tente novamente!"
    } else {
      // Server side error
      errorMsg = msgDefault ? msgDefault : "Não foi possível executar a operação, tente novamente!"
    }

    return errorMsg;
  }
}
