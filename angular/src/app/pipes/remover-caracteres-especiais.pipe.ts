import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Pipe({
  name: 'removerCaracteresEspeciais',
  standalone: true,
})
export class RemoverCaracteresEspeciaisPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .normalize('NFD') // separa caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .toLowerCase();
  }
}
