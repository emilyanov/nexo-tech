import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/angular';

import {
  CarrinhoService,
  ItemCarrinho
} from '../../services/carrinho.service';

import { MoedaRealPipe } from '../../pipes/moeda-real-pipe';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    MoedaRealPipe
  ],
})
export class CarrinhoPage {

  itens$ = this.carrinhoService.itens$;

  constructor(
    public carrinhoService: CarrinhoService
  ) {}

  aumentarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.alterarQuantidade(
      item.produto.id,
      item.quantidade + 1
    );
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.alterarQuantidade(
      item.produto.id,
      item.quantidade - 1
    );
  }

  removerProduto(id: number): void {
    this.carrinhoService.removerProduto(id);
  }

  limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();
  }

  obterTotal(): number {
    return this.carrinhoService.obterTotal();
  }

  obterQuantidade(): number {
    return this.carrinhoService.obterQuantidadeItens();
  }
}