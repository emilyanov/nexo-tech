import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Produto } from '../models/produto.model';

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly storageKey = 'nexo-tech-carrinho';

  private itensSubject = new BehaviorSubject<ItemCarrinho[]>(
    this.carregarArmazenamento()
  );

  itens$: Observable<ItemCarrinho[]> = this.itensSubject.asObservable();

  constructor() {}

  private carregarArmazenamento(): ItemCarrinho[] {
    try {
      const dados = localStorage.getItem(this.storageKey);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  private salvarArmazenamento(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.itensSubject.value)
    );
  }

  adicionarProduto(produto: Produto, quantidade: number = 1): void {
    if (quantidade <= 0 || produto.stock <= 0) {
      return;
    }

    const itens = [...this.itensSubject.value];

    const itemExistente = itens.find(
      item => item.produto.id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade = Math.min(
        itemExistente.quantidade + quantidade,
        produto.stock
      );
    } else {
      itens.push({
        produto,
        quantidade: Math.min(quantidade, produto.stock)
      });
    }

    this.atualizarCarrinho(itens);
  }

  removerProduto(id: number): void {
    const itens = this.itensSubject.value.filter(
      item => item.produto.id !== id
    );

    this.atualizarCarrinho(itens);
  }

  alterarQuantidade(id: number, quantidade: number): void {
    if (quantidade <= 0) {
      this.removerProduto(id);
      return;
    }

    const itens = this.itensSubject.value.map(item => {
      if (item.produto.id === id) {
        return {
          ...item,
          quantidade: Math.min(quantidade, item.produto.stock)
        };
      }

      return item;
    });

    this.atualizarCarrinho(itens);
  }

  limparCarrinho(): void {
    this.atualizarCarrinho([]);
  }

  obterItens(): ItemCarrinho[] {
    return this.itensSubject.value;
  }

  obterTotal(): number {
    return this.itensSubject.value.reduce(
      (total, item) => total + item.produto.price * item.quantidade,
      0
    );
  }

  obterQuantidadeItens(): number {
    return this.itensSubject.value.reduce(
      (total, item) => total + item.quantidade,
      0
    );
  }

  private atualizarCarrinho(itens: ItemCarrinho[]): void {
    this.itensSubject.next(itens);
    this.salvarArmazenamento();
  }
}