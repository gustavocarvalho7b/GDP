import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-bar',
  templateUrl: './home-bar.component.html',
  styleUrl: './home-bar.component.scss',
})
export class HomeBarComponent {
  @Output() excluir = new EventEmitter<any>();
  overlay: any;

  verPerfil() {
    console.log('');
  }
}
