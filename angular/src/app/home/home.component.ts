import { Component } from '@angular/core';
import { Publicidade } from '../models/publicidade';
import { EstadoService } from '../services/estado.service';
import { Estados } from '../models/estados';
import { PublicidadeService } from '../services/publicidade.service';
import { RemoverCaracteresEspeciaisPipe } from '../pipes/remover-caracteres-especiais.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  publicidades: Publicidade[] = [];
  modalVisivel: boolean = false;
  todosEstados: Estados[] = [];
  estadoSelecionado: any = null;
  todasPublicidades: Publicidade[] = [];
  buscarPublicidade: string = '';

  constructor(
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService,
    private removerPipe: RemoverCaracteresEspeciaisPipe
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
  }

  fecharModal() {
    this.modalVisivel = false;
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
      this.todasPublicidades = dados;
    });
  }

  abrirDropdown() {
    if (this.todosEstados.length === 0) {
      this.estadoService.selecionar().subscribe((estados) => {
        this.todosEstados = [
          { id: 0, descricao: 'Todos os estados', sigla: '' },
          ...estados,
        ];
      });
    }
  }

  selecionarEstado() {
    if (!this.estadoSelecionado) return;

    if (this.estadoSelecionado.id === 0) {
      this.publicidades = this.todasPublicidades;
    } else {
      const idEstado = this.estadoSelecionado.id;

      this.publicidades = this.todasPublicidades.filter((pub) =>
        pub.cad_estados.some((estado) => estado.id === idEstado)
      );
    }
  }

  buscarPublicidades() {
    const termo = this.removerPipe.transform(this.buscarPublicidade);
    this.publicidades = this.todasPublicidades.filter((pub) => {
      const titulo = this.removerPipe.transform(pub.titulo);
      const descricao = this.removerPipe.transform(pub.descricao);
      return titulo.includes(termo) || descricao.includes(termo);
    });
  }
}
