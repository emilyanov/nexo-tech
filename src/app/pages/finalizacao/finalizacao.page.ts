import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/angular';

import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-finalizacao',
  templateUrl: './finalizacao.page.html',
  styleUrls: ['./finalizacao.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton
  ],
})
export class FinalizacaoPage {

  itens$ = this.carrinhoService.itens$;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  obterTotal(): number {
    return this.carrinhoService.obterTotal();
  }

  obterQuantidade(): number {
    return this.carrinhoService.obterQuantidadeItens();
  }

  confirmarCompra(): void {
    if (this.carrinhoService.obterQuantidadeItens() === 0) {
      return;
    }

    this.router.navigate(['/confirmacao']);
  }
}