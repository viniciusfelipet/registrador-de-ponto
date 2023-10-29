import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [
    provideEnvironmentNgxMask(),
    { 
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
      useValue: { 
        duration: 3000,
        verticalPosition: 'top'
       }
     }
  ]
})
export class SharedModule { }
