import { Component, EventEmitter, Output } from '@angular/core';
import { ReceberEstado } from '../models/receberEstado';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-cadastro-estado',
  templateUrl: './cadastro-estado.component.html',
  styleUrl: './cadastro-estado.component.scss',
})
export class CadastroEstadoComponent {
  @Output() fecharCadastro = new EventEmitter<void>();

  constructor(private estadoService: EstadoService) {}

  estado: ReceberEstado = {
    descricao: '',
    sigla: '',
  };
  salvar() {
    this.estadoService.criarEstado(this.estado).subscribe({
      next: () => {
        console.log('Estado cadastrado com sucesso!');
        this.fecharCadastro.emit(); // fecha o formulário, se quiser
      },
      error: (err) => {
        console.error('Erro ao cadastrar estado:', err);
      },
    });
  }
  cancelar() {
    this.fecharCadastro.emit();
  }
}
