import { MatDialog } from '@angular/material/dialog';
import { MarcacoesService } from './../../core/services/marcacoes/marcacoes.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Marcacao } from 'src/app/core/models/marcacoes/marcacao.model';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-marcacoes',
  templateUrl: './marcacoes.component.html',
  styleUrls: ['./marcacoes.component.scss']
})
export class MarcacoesComponent implements OnInit {

  marcacoes: Marcacao[] = [];

  constructor(
    private marcacoesService: MarcacoesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getMarcacoes();
  }

  getMarcacoes() {
    this.marcacoesService.getMarcacoes().then(list => this.marcacoes = list);
  }

  getDia(marcacao: Marcacao) {
    return moment(marcacao.dataHora).format("dddd - DD/MM/YYYY")
  }

  getHorario(marcacao: Marcacao) {
    return moment(marcacao.dataHora).format("HH:mm")
  }

  onRemoverMarcacao(marcacao: Marcacao) {
    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        disableClose: true,
        data: {
          title: "Atenção",
          msg: "Deseja remover este ponto?"
        }
      }
    );

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      this.removerMarcacao(marcacao)
    })
  }

  private removerMarcacao(marcacao: Marcacao) {
    this.marcacoesService.removerMarcacao(marcacao)
      .then(() => { 
        this.getMarcacoes();
        this.snackBar.open(
          "Ponto removido com sucesso!",
          undefined,
          { panelClass: 'success' }
        )
       })
  }

}
