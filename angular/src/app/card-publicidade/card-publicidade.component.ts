import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publicidade } from '../models/publicidade';

@Component({
  selector: 'app-card-publicidade',
  templateUrl: './card-publicidade.component.html',
  styleUrl: './card-publicidade.component.scss',
})
export class CardPublicidadeComponent {
  @Input() publicidade!: any;
  @Input() tipo: 'atual' | 'futura' = 'atual';

  @Output() editar = new EventEmitter<Publicidade>();
  @Output() excluir = new EventEmitter<Publicidade>();
  @Output() alterarPadrao = new EventEmitter<Publicidade>();  

  isAtual(): boolean {
    if (!this.publicidade.dt_inicio || !this.publicidade.dt_fim) return false;

    const hoje = new Date();
    const hojeStr = hoje.toISOString().split('T')[0];

    const dtInicio = new Date(this.publicidade.dt_inicio);
    const dtInicioStr = dtInicio.toISOString().split('T')[0];

    const dtFim = new Date(this.publicidade.dt_fim);
    const dtFimStr = dtFim.toISOString().split('T')[0];

    return hojeStr >= dtInicioStr && hojeStr <= dtFimStr;
  }


  emitirAlteracaoPadrao() {
  this.alterarPadrao.emit(this.publicidade);
 }

  emitirEditar() {
    this.editar.emit(this.publicidade);
  }

  emitirExcluir() {
    this.excluir.emit(this.publicidade);
  }
}
