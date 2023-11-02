import { Subject, lastValueFrom } from 'rxjs';
import { Jornada } from './../../models/jornada/jornada.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  // 12
  changeJornada: Subject<Jornada> = new Subject()

  constructor(private http: HttpClient) { }

  getJornada() {
    return lastValueFrom(this.http.get<Jornada>(`${environment.JSON_SERVER_URL}/jornada`))
  }

  salvarJornada(jornada: Jornada) {
    return lastValueFrom(this.http.post<void>(`${environment.JSON_SERVER_URL}/jornada`, jornada))
      .then(() => {
        this.changeJornada.next(jornada)
        return Promise.resolve();
      })
  }
}
