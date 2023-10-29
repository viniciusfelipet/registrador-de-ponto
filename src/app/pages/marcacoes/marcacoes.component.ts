import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Marcacao } from 'src/app/core/models/marcacoes/marcacao.model';

@Component({
  selector: 'app-marcacoes',
  templateUrl: './marcacoes.component.html',
  styleUrls: ['./marcacoes.component.scss']
})
export class MarcacoesComponent implements OnInit {

  marcacoes: Marcacao[] = [];

  constructor(

  ) {

  }

  ngOnInit() {
    /*this.marcacoes = [
      { dataHora: new Date(2023, 9, 27, 8, 0) },
      { dataHora: new Date(2023, 9, 27, 12, 0) },
      { dataHora: new Date(2023, 9, 27, 13, 0) },
    ];*/
  }

  getDia(marcacao: Marcacao) {
    return moment(marcacao.dataHora).format("dddd - DD/MM/YYYY")
  }

  getHorario(marcacao: Marcacao) {
    return moment(marcacao.dataHora).format("HH:mm")
  }

}
