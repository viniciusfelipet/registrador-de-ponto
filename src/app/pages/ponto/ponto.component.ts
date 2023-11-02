import { MarcacoesService } from './../../core/services/marcacoes/marcacoes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/core/services/message/message.service';
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
    private dialog: MatDialog,
    private marcacoesService: MarcacoesService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
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

    dialogRef.afterClosed().subscribe(async (confirmado: boolean) => {
      if (!confirmado) return;

      const dataHora = new Date()

      await this.spinner.show()
      this.marcacoesService.salvarMarcacao({ id: null, dataHora: dataHora })
        .then(() => {
          this.setUltimaMarcacao(dataHora)
          this.messageService.success("Ponto registrado com sucesso!")
        })
        .catch((error) => this.messageService.warning(error))
        .finally(() => this.spinner.hide())
    });
  }

  setUltimaMarcacao(ultimaMarcacao: Date) {
    this.ultimaMarcacao = moment(ultimaMarcacao).format("DD/MM/YYYY HH:mm:ss")
  }
}
