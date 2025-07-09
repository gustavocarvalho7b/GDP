import { Component, EventEmitter, Output } from '@angular/core';
import { ReceberEstado } from '../models/receberEstado';
import { EstadoService } from '../services/estado.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-estado',
  templateUrl: './cadastro-estado.component.html',
  styleUrl: './cadastro-estado.component.scss',
})
export class CadastroEstadoComponent {
  @Output() fecharCadastro = new EventEmitter<void>();

  constructor(
    private estadoService: EstadoService,
    private messageService: MessageService
  ) {}

  estado: ReceberEstado = {
    descricao: '',
    sigla: '',
  };

  salvar() {
    this.estadoService.criarEstado(this.estado).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Estado cadastrado com sucesso',
          life: 3000,
        });
        this.fecharCadastro.emit();
      },
      error: (err) => {
        console.error('Erro ao cadastrar estado:', err);

        const erros = err.error;

        if (Array.isArray(erros)) {
          erros.forEach((msg: string) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: msg,
              life: 4000,
            });
          });
        } else if (typeof erros === 'object' && erros !== null) {
          Object.entries(erros).forEach(([campo, mensagens]) => {
            if (Array.isArray(mensagens)) {
              mensagens.forEach((msg) => {
                this.messageService.add({
                  severity: 'error',
                  summary: `Erro em ${campo}`,
                  detail: msg,
                  life: 4000,
                });
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: `Erro em ${campo}`,
                detail: String(mensagens),
                life: 4000,
              });
            }
          });
        } else if (typeof erros === 'string') {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: erros,
            life: 4000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao cadastrar estado.',
            life: 4000,
          });
        }
      },
    });
  }
  cancelar() {
    this.fecharCadastro.emit();
  }
}
