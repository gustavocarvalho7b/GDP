import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Publicidade } from '../models/publicidade';
import { PublicidadeService } from '../services/publicidade.service';
import { EstadoService } from '../services/estado.service';
import { Estados } from '../models/estados';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-nova-publicidade',
  templateUrl: './modal-nova-publicidade.component.html',
  styleUrl: './modal-nova-publicidade.component.scss',
})
export class ModalNovaPublicidadeComponent {
  @Input() visivel: boolean = false;
  @Input() publicidade: Publicidade | null = null;
  @Output() aoFechar = new EventEmitter<void>();
  @Output() publicacaoSalva = new EventEmitter<'sucesso' | 'erro'>();

  imagemBase64: string | null = null;
  imagemPreview: string | null = null;
  nomeImagem: string = '';
  estados: Estados[] = [];
  estadosContemplados: Estados[] = [];

  novaPublicidade: Publicidade = this.resetarPublicidade();

  ngOnChanges(): void {
    if (this.publicidade) {
      this.novaPublicidade = {
        ...this.publicidade,
        dt_inicio: this.dataLocal(this.publicidade.dt_inicio as any),
        dt_fim: this.dataLocal(this.publicidade.dt_fim as any),
        id_publicidade_estado:
          this.publicidade.cad_estados?.map((e) => e.id) || [],
      };

      this.imagemPreview = this.publicidade?.imagem_base64 || null;
      this.novaPublicidade.imagem_base64 = this.imagemPreview || '';
      this.nomeImagem = '';
    } else {
      this.novaPublicidade = this.resetarPublicidade();
      this.imagemPreview = null;
      this.nomeImagem = '';
    }
  }

  resetarPublicidade(): Publicidade {
    return {
      id: 0,
      titulo: '',
      descricao: '',
      imagem_base64: '',
      titulo_botao_link: '',
      botao_link: '',
      dt_inicio: new Date(),
      dt_fim: new Date(),
      id_publicidade_estado: [],
      cad_estados: [],
    };
  }

  constructor(
    private primengConfig: PrimeNGConfig,
    private publicidadeService: PublicidadeService,
    private estadoService: EstadoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.primengConfig.setTranslation({
      firstDayOfWeek: 0,
      dayNames: [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sábado',
      ],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
      ],
      monthNamesShort: [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
      ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem',
    });
    this.estadoService.selecionar().subscribe({
      next: (res) => {
        this.estados = res;
      },
      error: (err) => {
        console.error('Erro ao buscar estados:', err);
      },
    });
  }

  fechar() {
    this.aoFechar.emit();
  }

  arquivoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.nomeImagem = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;

        // salva no objeto que será enviado
        this.novaPublicidade!.imagem_base64 = this.imagemPreview;
      };
      reader.readAsDataURL(file);
    }
  }

  selecionarArquivo(event: DragEvent): void {
    event.preventDefault();
  }

  dropArquivo(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.nomeImagem = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
        this.novaPublicidade!.imagem_base64 = this.imagemPreview;
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagem(): void {
    this.imagemPreview = null;
    this.nomeImagem = '';
    this.novaPublicidade.imagem_base64 = '';
  }

  salvarPublicidade(): void {
    const { id, cad_estados, ...dadosParaEnvio } = this.novaPublicidade;

    const formatDateToString = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const payload = {
      cad_publicidade: {
        ...dadosParaEnvio,
        dt_inicio: formatDateToString(this.novaPublicidade.dt_inicio),
        dt_fim: formatDateToString(this.novaPublicidade.dt_fim),
      },
      imagem_base64: this.novaPublicidade.imagem_base64,
    };

    const request$ = this.novaPublicidade.id
      ? this.publicidadeService.atualizarPublicidade(
          this.novaPublicidade.id,
          payload
        )
      : this.publicidadeService.criarPublicidade(payload);

    request$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Publicação salva com sucesso',
          life: 3000,
        });
        console.log('Publicidade salva/atualizada com sucesso!');
        this.aoFechar.emit();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Falha ao salvar publicação',
          life: 3000,
        });
        console.error('Erro ao salvar/atualizar publicidade:', err);
      },
    });
  }

  dataLocal(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
