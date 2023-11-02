import { MessageService } from './../../../core/services/message/message.service';
import { JornadaService } from './../../../core/services/jornada/jornada.service';
import { Jornada } from './../../../core/models/jornada/jornada.model';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private subscriptions: Subscription[] = []
  jornada: Jornada = new Jornada();

  constructor(
    private jornadaService: JornadaService,
    private messageService: MessageService
  ) {
    this.jornadaService.getJornada()
    .then(jornada => {
      if (!jornada) return;
      
      this.jornada = jornada;
      this.formatarJornada()
    })
  }

  ngOnInit() {
    const sub = this.jornadaService.changeJornada.subscribe(j => { this.jornada = j; this.formatarJornada() })
    this.subscriptions.push(sub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  formatarJornada() {
    if (!this.jornada) {
      this.jornada = new Jornada()
    } else {
      this.jornada.entrada1 = moment(this.jornada.entrada1, "HHmm").format("HH:mm")
      this.jornada.saida1 = moment(this.jornada.saida1, "HHmm").format("HH:mm")
      this.jornada.entrada2 = moment(this.jornada.entrada2, "HHmm").format("HH:mm")
      this.jornada.saida2 = moment(this.jornada.saida2, "HHmm").format("HH:mm")
    }
  }

}
