import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Publicidade } from '../models/publicidade';
import { PublicidadeService } from '../services/publicidade.service';

@Component({
  selector: 'app-modal-nova-publicidade',
  templateUrl: './modal-nova-publicidade.component.html',
  styleUrl: './modal-nova-publicidade.component.scss',
})
export class ModalNovaPublicidadeComponent {
  @Input() visivel: boolean = false;
  @Output() aoFechar = new EventEmitter<void>();

  imagemBase64: string | null = null;
  imagemPreview: string | null = null;
  nomeImagem: string = '';
  estados: any[] | undefined;

  publicidade: Publicidade = {
    id: 0,
    titulo: '',
    descricao: '',
    botao_link: '',
    titulo_botao_link: '',
    dt_inicio: new Date(),
    dt_fim: new Date(),
    imagem_base64: '', // base64
    cad_estados: [],
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    private publicidadeService: PublicidadeService
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
  }

  fechar() {
    this.aoFechar.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.nomeImagem = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;

        // salva no objeto que será enviado
        this.publicidade.imagem_base64 = this.imagemPreview;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.nomeImagem = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
        this.publicidade.imagem_base64 = this.imagemPreview;
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagem(): void {
    this.imagemPreview = null;
    this.nomeImagem = '';
    this.publicidade.imagem_base64 = '';
  }

  salvarPublicidade() {
    this.publicidadeService.criarPublicidade(this.publicidade).subscribe({
      next: (res: any) => {
        console.log('Publicidade salva com sucesso!', res);
        this.fechar(); // ou this.fechar2() se estiver usando controle interno
      },
      error: (err: any) => {
        console.error('Erro ao salvar publicidade:', err);
      },
    });
  }
}
