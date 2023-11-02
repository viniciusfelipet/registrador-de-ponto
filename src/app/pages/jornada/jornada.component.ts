import { JornadaService } from './../../core/services/jornada/jornada.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss']
})
export class JornadaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private jornadaService: JornadaService
  ) {
    this.form = this.fb.group({
      entrada1: ["", [Validators.required, this.validateHorario]],
      saida1: ["", [Validators.required, this.validateHorario]],
      entrada2: ["", [Validators.required, this.validateHorario]],
      saida2: ["", [Validators.required, this.validateHorario]],
    })
  }

  ngOnInit() {
    this.jornadaService.getJornada()
      .then(jornada => {
        if (!jornada) return;
        
        this.form.get('entrada1')?.setValue(jornada.entrada1)
        this.form.get('saida1')?.setValue(jornada.saida1)
        this.form.get('entrada2')?.setValue(jornada.entrada2)
        this.form.get('saida2')?.setValue(jornada.saida2)
      })
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
      if (!confirmado) return;

      this.jornadaService.salvarJornada(this.form.value)
        .then(() => this.snackBar.open(
          "Jornada salva com sucesso!",
          undefined,
          { panelClass: 'success' }
        ))
    });
  }

  validateHorario(control: AbstractControl) {
    const regexHHMM = /^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/;
  
    if (!regexHHMM.test(control.value))
      return { invalidFormat: true };
      
    return null;
  }
  
  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);

    if (!control) return '';
  
    if (control.hasError('required')) 
      return 'Este campo é obrigatório';
  
    if (control.hasError('invalidFormat'))
      return 'Formato inválido. Use HH:MM'

    return ''
  }
  

}
