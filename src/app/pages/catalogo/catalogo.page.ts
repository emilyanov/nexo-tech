import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink
  ],
})
export class CatalogoPage implements OnInit {

  produtos: Produto[] = [];
  carregando = false;
  erro = '';

  termoPesquisa = '';
  categoriaAtual = 'laptops';

  categorias = [
    { nome: 'Notebooks', valor: 'laptops' },
    { nome: 'Smartphones', valor: 'smartphones' },
    { nome: 'Tablets', valor: 'tablets' },
    { nome: 'Acessórios', valor: 'mobile-accessories' }
  ];

  constructor(
    private produtosService: ProdutosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando = true;
    this.erro = '';

    this.produtosService
      .getProdutosPorCategoria(this.categoriaAtual)
      .subscribe({
        next: (resposta) => {
          this.produtos = resposta.products;
          this.carregando = false;
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao carregar produtos:', erro);
          this.erro = 'Não foi possível carregar os produtos.';
          this.carregando = false;
          this.cdr.detectChanges();
        }
      });
  }

  selecionarCategoria(categoria: string) {
    this.categoriaAtual = categoria;
    this.termoPesquisa = '';
    this.carregarProdutos();
  }

  pesquisarProdutos() {
    const termo = this.termoPesquisa.trim();

    if (!termo) {
      this.carregarProdutos();
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.produtosService.pesquisarProdutos(termo).subscribe({
      next: (resposta) => {
        this.produtos = resposta.products;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao pesquisar produtos:', erro);
        this.erro = 'Não foi possível realizar a pesquisa.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}