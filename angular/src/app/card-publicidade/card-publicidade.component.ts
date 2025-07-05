import { Component, Input } from '@angular/core';
import { Publicidade } from '../models/publicidade';

@Component({
  selector: 'app-card-publicidade',
  templateUrl: './card-publicidade.component.html',
  styleUrl: './card-publicidade.component.scss',
})
export class CardPublicidadeComponent {
  @Input() publicidade!: any;
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
}
