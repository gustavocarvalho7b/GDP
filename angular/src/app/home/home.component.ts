import { Component } from '@angular/core';
import { Publicidade } from '../models/publicidade';
import { EstadoService } from '../services/estado.service';
import { Estados } from '../models/estados';
import { PublicidadeService } from '../services/publicidade.service';
import { RemoverCaracteresEspeciaisPipe } from '../pipes/remover-caracteres-especiais.pipe';
import { MessageService } from 'primeng/api';

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
  publicidadePadrao: Publicidade[] = [];

  constructor(
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService,
    private removerPipe: RemoverCaracteresEspeciaisPipe,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.publicidadeService.selecionar().subscribe((dados) => {
      this.publicidades = dados;
      this.todasPublicidades = dados;
      this.filtrarPublicidadesPorData();
    });
  }

  selecionarEstado(event: any) {
    console.log(new Date().toString());
    this.estadoSelecionado = event.value;
    this.filtrarPublicidadesPorData();
    this.buscarPublicidades();
  }

  filtrarPublicidadesPorData() {
    const hoje = new Date();
    hoje.setHours(-24);

    const fimDoDia = new Date(hoje);
    fimDoDia.setHours(23, 59, 59, 999);

    this.publicidadesAtuais = this.todasPublicidades
      .filter((pub) => {
        const dtInicio = new Date(pub.dt_inicio);
        const dtFim = new Date(pub.dt_fim);

        const pertenceAoEstado =
          this.estadoSelecionado === 0 ||
          this.estadoSelecionado === null ||
          pub.cad_estados?.some(
            (estado) => estado.id === this.estadoSelecionado
          );

        return dtInicio <= fimDoDia && dtFim >= hoje && pertenceAoEstado;
      })
      .sort(
        (a, b) => new Date(a.dt_fim).getTime() - new Date(b.dt_fim).getTime()
      );

    this.publicidadesFuturas = this.todasPublicidades
      .filter((pub) => {
        const dtInicio = new Date(pub.dt_inicio);
        const pertenceAoEstado =
          this.estadoSelecionado === 0 ||
          this.estadoSelecionado === null ||
          pub.cad_estados?.some(
            (estado) => estado.id === this.estadoSelecionado
          );
        return dtInicio > fimDoDia && pertenceAoEstado;
      })
      .sort(
        (a, b) =>
          new Date(a.dt_inicio).getTime() - new Date(b.dt_inicio).getTime()
      );
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

  atualizarPadrao(publicidade: Publicidade) {
    if (!publicidade.id) return;

    this.publicidadeService
      .atualizarPublicidade(publicidade.id, { padrao: publicidade.padrao })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Atualizado',
            detail: 'Publicidade marcada como padrão',
            life: 3000,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao salvar alteração de padrão',
            life: 3000,
          });
        },
      });
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
        this.messageService.add({
          severity: 'info',
          summary: 'Encerrada',
          detail: 'A publicidade foi encerrada com sucesso',
          life: 3000,
        });
        this.publicidades = this.publicidades.filter(
          (p) => p.id !== publicidade.id
        );
        this.todasPublicidades = this.publicidades;
        this.filtrarPublicidadesPorData();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao excluir',
          detail: 'Não foi possível encerrar a publicidade',
          life: 3000,
        });
        console.error('Erro ao excluir publicidade:', err);
      },
    });
  }

  mostrarToast(tipo: 'sucesso' | 'erro') {
    if (tipo === 'sucesso') {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Publicação salva com sucesso',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Não foi possível salvar a publicação',
        life: 3000,
      });
    }
  }
}
