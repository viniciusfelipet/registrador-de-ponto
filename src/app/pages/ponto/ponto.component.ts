import { MarcacoesService } from './../../core/services/marcacoes/marcacoes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Marcacao } from 'src/app/core/models/marcacoes/marcacao.model';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ponto',
  templateUrl: './ponto.component.html',
  styleUrls: ['./ponto.component.scss']
})
export class PontoComponent implements OnInit, OnDestroy {

  dataHoraAtual = new Date();
  timer: NodeJS.Timeout | undefined;

  ultimaMarcacao = "--/--/---- --:--:--";

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private marcacoesService: MarcacoesService
  ) {
    const ultimaMarcacao = this.marcacoesService.getUltimaMarcacao();
    if (ultimaMarcacao)
      this.setUltimaMarcacao(ultimaMarcacao)
  }

  ngOnInit() {
    this.timer = setInterval(() => this.dataHoraAtual = new Date(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  registrarPonto() {
    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        disableClose: true,
        data: {
          title: "Atenção",
          msg: "Deseja registrar o ponto?"
        }
      }
    );

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      const dataHora = new Date()
      this.marcacoesService.salvarMarcacao({ id: null, dataHora: dataHora })
        .then(() => {
          this.setUltimaMarcacao(dataHora)

          this.snackBar.open(
            "Ponto registrado com sucesso!",
            undefined,
            { panelClass: 'success' }
          )
        });
    });
  }

  setUltimaMarcacao(ultimaMarcacao: Date) {
    this.ultimaMarcacao = moment(ultimaMarcacao).format("DD/MM/YYYY HH:mm:ss")
  }

  get diaSemanaEData() : string {
    return moment(this.dataHoraAtual).format("dddd | DD/MM/YYYY");
  }

  get horaMinuto() : string {
    return moment(this.dataHoraAtual).format("HH:mm");
  }

  get segundos() : string {
    return moment(this.dataHoraAtual).format("ss");
  }

}
