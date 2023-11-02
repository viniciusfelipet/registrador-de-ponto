import { Marcacao } from './../../models/marcacoes/marcacao.model';
import { Injectable } from '@angular/core';
import { Jornada } from '../../models/jornada/jornada.model';

const MARCACOES_KEY = 'marcacoes-key';

@Injectable({
  providedIn: 'root'
})
export class MarcacoesService {

  constructor() { }

  getMarcacoes() {
    return JSON.parse(localStorage.getItem(MARCACOES_KEY)!) as Marcacao[] || [];
  }

  salvarMarcacao(marcacao: Marcacao) {
    const marcacoes = this.getMarcacoes();
    marcacoes.push(marcacao);

    localStorage.setItem(MARCACOES_KEY, JSON.stringify(marcacoes));
  }
}
