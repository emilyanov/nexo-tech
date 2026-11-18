import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ],
})
export class ConfirmacaoPage {

  numeroPedido = Date.now();

  dataCompra = new Date();

  totalCompra = 0;
  quantidadeItens = 0;

  constructor(
    private carrinhoService: CarrinhoService
  ) {
    this.totalCompra = this.carrinhoService.obterTotal();
    this.quantidadeItens = this.carrinhoService.obterQuantidadeItens();

    this.carrinhoService.limparCarrinho();
  }
}