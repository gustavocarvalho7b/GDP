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
  publicidadesAtuais: Publicidade[] = [];
  publicidadesFuturas: Publicidade[] = [];

  constructor(
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService,
    private removerPipe: RemoverCaracteresEspeciaisPipe
  ) {}

  ngOnInit() {
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
      this.todasPublicidades = dados;
      this.filtrarPublicidadesPorData();
    });
  }

  filtrarPublicidadesPorData() {
    const hojeStr = new Date().toISOString().split('T')[0];

    this.publicidadesAtuais = this.todasPublicidades.filter((pub) => {
      const dtInicioStr = new Date(pub.dt_inicio).toISOString().split('T')[0];
      const dtFimStr = new Date(pub.dt_fim).toISOString().split('T')[0];
      const pertenceAoEstado =
        this.estadoSelecionado === 0 ||
        this.estadoSelecionado === null ||
        pub.cad_estados?.some((estado) => estado.id === this.estadoSelecionado);
      return hojeStr >= dtInicioStr && hojeStr <= dtFimStr && pertenceAoEstado;
    });

    this.publicidadesFuturas = this.todasPublicidades.filter((pub) => {
      const dtInicioStr = new Date(pub.dt_inicio).toISOString().split('T')[0];
      const pertenceAoEstado =
        this.estadoSelecionado === 0 ||
        this.estadoSelecionado === null ||
        pub.cad_estados?.some((estado) => estado.id === this.estadoSelecionado);
      return dtInicioStr > hojeStr && pertenceAoEstado;
    });
  }
  abrirModal() {
    this.publicidadeEditando = null;
    this.modalVisivel = true;
  }

  fecharModal() {
    this.modalVisivel = false;
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
      this.todasPublicidades = dados;
      this.filtrarPublicidadesPorData();
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

  selecionarEstado(event: any) {
    this.estadoSelecionado = event.value;
    this.filtrarPublicidadesPorData();
    this.buscarPublicidades();
  }

  buscarPublicidades() {
    this.filtrarPublicidadesPorData();
    const termo = this.removerPipe.transform(this.buscarPublicidade);

    const filtrar = (lista: Publicidade[]): Publicidade[] => {
      return lista.filter((pub) => {
        const pertenceAoEstado =
          this.estadoSelecionado === 0 ||
          this.estadoSelecionado === null ||
          pub.cad_estados?.some(
            (estado) => estado.id === this.estadoSelecionado
          );

        if (!pertenceAoEstado) return false;

        const titulo = this.removerPipe.transform(pub.titulo);
        const descricao = this.removerPipe.transform(pub.descricao);

        return titulo.includes(termo) || descricao.includes(termo);
      });
    };

    this.publicidadesAtuais = filtrar(this.publicidadesAtuais);
    this.publicidadesFuturas = filtrar(this.publicidadesFuturas);
  }

  carregarPublicidades() {
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.todasPublicidades = dados;
      this.buscarPublicidades();
      this.filtrarPublicidadesPorData();
    });
  }

  editarPublicidade(publicidade: Publicidade) {
    this.publicidadeEditando = { ...publicidade };
    this.modalVisivel = true;
  }

  excluirPublicidade(publicidade: Publicidade): void {
    console.log('Tentando excluir ID:', publicidade.id);
    if (!publicidade.id) {
      console.warn('ID da publicidade não definido!');
      return;
    }

    this.publicidadeService.excluirPublicidade(publicidade.id).subscribe({
      next: () => {
        console.log('Publicidade excluída com sucesso!');
        this.carregarPublicidades();
      },
      error: (err) => {
        console.error('Erro ao excluir publicidade:', err);
      },
    });
  }
}
