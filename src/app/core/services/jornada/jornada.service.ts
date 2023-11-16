import { Subject, lastValueFrom } from 'rxjs';
import { Jornada } from './../../models/jornada/jornada.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  // 12
  changeJornada: Subject<Jornada> = new Subject()

  constructor(private http: HttpClient) { }

  getJornada() {
    return lastValueFrom(this.http.get<Jornada>(`${environment.JSON_SERVER_URL}/jornada`))
      .catch((error: HttpErrorResponse) => Promise.reject(
        ErrorService.handleErrorPromise(error, "Não foi possível obter a jornada!")
      ))
  }

  salvarJornada(jornada: Jornada) {
    return lastValueFrom(this.http.post<void>(`${environment.JSON_SERVER_URL}/jornada`, jornada))
      .then(() => {
        this.changeJornada.next(jornada)
        return Promise.resolve();
      })
      .catch((error: HttpErrorResponse) => Promise.reject(
        ErrorService.handleErrorPromise(error, "Não foi possível salvar a jornada!")
      ))
  }
}
