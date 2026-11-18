import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaReal',
  standalone: true
})
export class MoedaRealPipe implements PipeTransform {

  transform(valorUsd: number, cotacao: number = 5): string {

    if (valorUsd == null || isNaN(valorUsd)) {
      return 'R$ 0,00';
    }

    const valorReal = valorUsd * cotacao;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valorReal);
  }

}