import { Component } from '@angular/core';
import { Publicidade } from '../models/publicidade';
import { EstadoService } from '../services/estado.service';
import { Estados } from '../models/estados';
import { PublicidadeService } from '../services/publicidade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  publicidades: Publicidade[] = [];
  modalVisivel: boolean = false;
  todosEstados: Estados[] = [];
  estadoSelecionado?: Estados;
  todasPublicidades: Publicidade[] = [];

  constructor(
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService
  ) {}

  ngOnInit() {
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
    });
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
      this.todasPublicidades = dados; // backup completo
    });
  }

  abrirModal() {
    this.modalVisivel = true;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
  }

  fecharModal() {
    this.modalVisivel = false;
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px';
  }

  abrirDropdown() {
    if (this.todosEstados.length === 0) {
      this.estadoService.selecionar().subscribe((estados) => {
        this.todosEstados = estados;
      });
    }
  }

  selecionarEstado() {
    if (!this.estadoSelecionado) {
      this.publicidades = this.todasPublicidades;
      return;
    }

    const idEstado = this.estadoSelecionado.id;

    this.publicidades = this.todasPublicidades.filter((pub) =>
      pub.cad_estados.some((estado) => estado.id === idEstado)
    );
  }
}
