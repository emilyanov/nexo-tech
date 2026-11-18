import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appEstoque]',
  standalone: true
})
export class EstoqueDirective {

  @Input() appEstoque: number = 0;

  @HostBinding('style.color')
  get cor(): string {
    if (this.appEstoque <= 0) {
      return '#EF4444';
    }

    if (this.appEstoque <= 5) {
      return '#F59E0B';
    }

    return '#22C55E';
  }

  @HostBinding('style.font-weight')
  pesoFonte = '700';

}