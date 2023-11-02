import { Subject } from 'rxjs';
import { Jornada } from './../../models/jornada/jornada.model';
import { Injectable, EventEmitter } from '@angular/core';

const JORNADA_KEY = 'jornada-key';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  changeJornada: Subject<Jornada> = new Subject()

  constructor() { }

  getJornada() {
    return JSON.parse(localStorage.getItem(JORNADA_KEY)!) as Jornada;
  }

  salvarJornada(jornada: Jornada) {
    localStorage.setItem(JORNADA_KEY, JSON.stringify(jornada));
    this.changeJornada.next(jornada);
  }
}
