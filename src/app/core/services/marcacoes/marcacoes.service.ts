import { Marcacao } from './../../models/marcacoes/marcacao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environments';

const MARCACOES_KEY = 'marcacoes-key';
const ULTIMA_MARCACAO_KEY = "ultima-marcacao-key"

@Injectable({
  providedIn: 'root'
})
export class MarcacoesService {

  constructor(private http: HttpClient) { }

  getMarcacoes() {
    return lastValueFrom(this.http.get<Marcacao[]>(`${environment.JSON_SERVER_URL}/marcacoes?_sort=dataHora&_order=desc`))
  }

  getUltimaMarcacao() {
    return JSON.parse(localStorage.getItem(ULTIMA_MARCACAO_KEY)!);
  }

  salvarMarcacao(marcacao: Marcacao) {
    return lastValueFrom(this.http.post<void>(`${environment.JSON_SERVER_URL}/marcacoes`, marcacao))
      .then(() => {
        localStorage.setItem(ULTIMA_MARCACAO_KEY, JSON.stringify(marcacao.dataHora))
        return Promise.resolve();
      })
  }

  removerMarcacao(marcacao: Marcacao) {
    return lastValueFrom(this.http.delete<void>(`${environment.JSON_SERVER_URL}/marcacoes/${marcacao.id}`))
  }
}
