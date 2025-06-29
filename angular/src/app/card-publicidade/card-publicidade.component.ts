import { Component, Input } from '@angular/core';
import { Publicidade } from '../models/publicidade';

@Component({
  selector: 'app-card-publicidade',
  templateUrl: './card-publicidade.component.html',
  styleUrl: './card-publicidade.component.scss',
})
export class CardPublicidadeComponent {
  @Input() publicidade!: Publicidade;
}
