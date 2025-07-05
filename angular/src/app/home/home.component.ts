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
  estadoSelecionado: number | null = null;
  todasPublicidades: Publicidade[] = [];
  buscarPublicidade: string = '';
  publicidadeEditando: Publicidade | null = null;

  constructor(
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService,
    private removerPipe: RemoverCaracteresEspeciaisPipe
  ) {}

  ngOnInit() {
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
      this.todasPublicidades = dados;
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
    if (this.estadoSelecionado === 0 || this.estadoSelecionado === null) {
      this.publicidades = this.todasPublicidades;
    } else {
      const idEstado = this.estadoSelecionado;

      this.publicidades = this.todasPublicidades.filter((pub) =>
        pub.cad_estados?.some((estado) => estado.id === idEstado)
      );
    }
    this.buscarPublicidades();
  }

  buscarPublicidades() {
    const termo = this.removerPipe.transform(this.buscarPublicidade);

    this.publicidades = this.todasPublicidades.filter((pub) => {
      const pertenceAoEstado =
        this.estadoSelecionado === 0 ||
        this.estadoSelecionado === null ||
        pub.cad_estados?.some((estado) => estado.id === this.estadoSelecionado);

      if (!pertenceAoEstado) {
        return false;
      }

      const titulo = this.removerPipe.transform(pub.titulo);
      const descricao = this.removerPipe.transform(pub.descricao);

      return titulo.includes(termo) || descricao.includes(termo);
    });
  }

  editarPublicidade(publicidade: Publicidade) {
    this.publicidadeEditando = { ...publicidade };
    this.modalVisivel = true;
  }

  excluirPublicidade(publicidade: any) {
    // Aqui vai a lógica para exclusão
    console.log('Excluir publicidade:', publicidade);
  }
}
