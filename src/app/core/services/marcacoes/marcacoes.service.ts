import { Marcacao } from './../../models/marcacoes/marcacao.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ErrorService } from '../error/error.service';

const ULTIMA_MARCACAO_KEY = "ultima-marcacao-key"

@Injectable({
  providedIn: 'root'
})
export class MarcacoesService {

  constructor(private http: HttpClient) { }

  getMarcacoes() {
    return lastValueFrom(this.http.get<Marcacao[]>(`${environment.JSON_SERVER_URL}/marcacoes?_sort=dataHora&_order=desc`))
      .catch((error: HttpErrorResponse) => Promise.reject(
        ErrorService.handleErrorPromise(error, "Não foi possível obter as marcações!")
      ))
  }

  salvarMarcacao(marcacao: Marcacao) {
    return lastValueFrom(this.http.post<void>(`${environment.JSON_SERVER_URL}/marcacoes`, marcacao))
      .then(() => {
        localStorage.setItem(ULTIMA_MARCACAO_KEY, JSON.stringify(marcacao.dataHora))
        return Promise.resolve();
      })
      .catch((error: HttpErrorResponse) => Promise.reject(
        ErrorService.handleErrorPromise(error, "Não foi possível registrar o ponto!")
      ))
  }

  removerMarcacao(marcacao: Marcacao) {
    return this.http.delete<void>(`${environment.JSON_SERVER_URL}/marcacoes/${marcacao.id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => ErrorService.handleErrorObservable(error, "Não foi possível excluir o ponto!"))
      )
  }

  getUltimaMarcacao() {
    return JSON.parse(localStorage.getItem(ULTIMA_MARCACAO_KEY)!);
  }
}
