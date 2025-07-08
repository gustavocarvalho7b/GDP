import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-bar',
  templateUrl: './home-bar.component.html',
  styleUrl: './home-bar.component.scss',
})
export class HomeBarComponent {
  mostrarCadastroEstado = false;

  abrirCadastroEstado() {
    this.mostrarCadastroEstado = !this.mostrarCadastroEstado;
  }

  verPerfil() {
    console.log('');
  }

  resetarCadastroEstado() {
    this.mostrarCadastroEstado = false;
  }
}
