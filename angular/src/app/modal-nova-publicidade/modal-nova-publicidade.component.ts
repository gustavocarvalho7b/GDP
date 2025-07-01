import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-modal-nova-publicidade',
  templateUrl: './modal-nova-publicidade.component.html',
  styleUrl: './modal-nova-publicidade.component.scss'
})
export class ModalNovaPublicidadeComponent {
estados: any[]|undefined;

constructor(private primengConfig: PrimeNGConfig) {}

ngOnInit() {
  this.primengConfig.setTranslation({
    firstDayOfWeek: 0,
    dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ],
    monthNamesShort: [
      "jan", "fev", "mar", "abr", "mai", "jun",
      "jul", "ago", "set", "out", "nov", "dez"
    ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sem'
  });
}

}
