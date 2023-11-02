import { MarcacoesService } from './../../core/services/marcacoes/marcacoes.service';
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
    private marcacoesService: MarcacoesService
  ) {
    this.marcacoes = this.marcacoesService.getMarcacoes();
  }

  ngOnInit() {

  }

  getDia(marcacao: Marcacao) {
    return moment(marcacao.dataHora).format("dddd - DD/MM/YYYY")
  }

  getHorario(marcacao: Marcacao) {
    return moment(marcacao.dataHora).format("HH:mm")
  }

}
