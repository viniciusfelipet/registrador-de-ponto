import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PontoComponent } from './pages/ponto/ponto.component';
import { JornadaComponent } from './pages/jornada/jornada.component';
import { MarcacoesComponent } from './pages/marcacoes/marcacoes.component';

const routes: Routes = [
  {path: "", redirectTo: 'ponto', pathMatch: 'full'},
  
  { 
    path: 'ponto', 
    component: PontoComponent 
  }, 
  { 
    path: 'marcacoes', 
    component: MarcacoesComponent 
  }, 
  { 
    path: 'jornada', 
    component: JornadaComponent 
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
