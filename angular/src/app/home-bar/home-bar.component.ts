import { Component } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-home-bar',
  templateUrl: './home-bar.component.html',
  styleUrl: './home-bar.component.scss',
})
export class HomeBarComponent {
  mostrarCadastroEstado = false;

  abrirCadastroEstado(overlay: OverlayPanel) {
    overlay.hide();
    this.mostrarCadastroEstado = !this.mostrarCadastroEstado;
  }

  verPerfil() {}

  resetarCadastroEstado() {
    this.mostrarCadastroEstado = false;
  }
}
