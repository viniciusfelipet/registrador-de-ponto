import { MatDialog } from '@angular/material/dialog';
import { MarcacoesService } from './../../core/services/marcacoes/marcacoes.service';
import { Component, OnInit } from '@angular/core';
import { Marcacao } from 'src/app/core/models/marcacoes/marcacao.model';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'src/app/core/services/message/message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-marcacoes',
  templateUrl: './marcacoes.component.html',
  styleUrls: ['./marcacoes.component.scss']
})
export class MarcacoesComponent implements OnInit {

  marcacoes: Marcacao[] = [];

  constructor(
    private marcacoesService: MarcacoesService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getMarcacoes();
  }

  async getMarcacoes() {
    await this.spinner.show()

    this.marcacoesService.getMarcacoes()
     .then(list => this.marcacoes = list)
     .catch((error) => this.messageService.warning(error))
     .finally(() => this.spinner.hide())
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

  private async removerMarcacao(marcacao: Marcacao) {
    await this.spinner.show()

    this.marcacoesService.removerMarcacao(marcacao)
      .subscribe({
        next: () => {
          this.getMarcacoes();
          this.messageService.success("Ponto removido com sucesso!")
          this.spinner.hide()
        },
        error: async (error) => {
          await this.spinner.hide()
          this.messageService.warning(error)
        },
      })
  }

}
