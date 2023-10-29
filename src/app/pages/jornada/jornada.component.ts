import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss']
})
export class JornadaComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {

  }

  salvarJornada() {
    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        disableClose: true,
        data: {
          title: "Atenção",
          msg: "Deseja salvar a nova jornada?"
        }
      }
    );

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado)
        this.snackBar.open(
          "Jornada salva com sucesso!",
          undefined,
          { panelClass: 'success' }
        )
    });
  }

}
