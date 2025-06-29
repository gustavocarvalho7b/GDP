import { Component } from '@angular/core';
import { Publicidade } from '../models/publicidade';
import { PublicidadeService } from '../publicidade/publicidade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  publicidades: Publicidade[] = [];

  constructor(private publicidadeService: PublicidadeService) {}

  ngOnInit() {
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
    });
  }
}
