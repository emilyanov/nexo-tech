import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDestaqueOferta]',
  standalone: true
})
export class DestaqueOfertaDirective {

  @Input() appDestaqueOferta: number = 0;

  @HostBinding('style.border')
  get borda(): string | null {
    return this.appDestaqueOferta > 10
      ? '2px solid #22D3EE'
      : null;
  }

  @HostBinding('style.box-shadow')
  get sombra(): string | null {
    return this.appDestaqueOferta > 10
      ? '0 0 12px rgba(34, 211, 238, 0.15)'
      : null;
  }

}