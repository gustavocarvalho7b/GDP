import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Publicidade } from '../models/publicidade';

@Component({
  selector: 'app-card-publicidade',
  templateUrl: './card-publicidade.component.html',
  styleUrl: './card-publicidade.component.scss',
})
export class CardPublicidadeComponent {
  @Input() publicidade!: any;

  @Output() editar = new EventEmitter<Publicidade>();
  @Output() excluir = new EventEmitter<Publicidade>();
  isAtual(): boolean {
    if (!this.publicidade.dt_inicio || !this.publicidade.dt_fim) return false;

    // Criar objeto com horário de Brasília (UTC-3)
    const now = new Date();
    const dataAtual = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );

    const inicio = new Date(this.publicidade.dt_inicio);
    const fim = new Date(this.publicidade.dt_fim);

    return dataAtual >= inicio && dataAtual <= fim;
  }

  emitirEditar() {
    this.editar.emit(this.publicidade);
  }

  emitirExcluir() {
    this.excluir.emit(this.publicidade);
  }

  @ViewChild('overlay') overlay!: OverlayPanel;
}
