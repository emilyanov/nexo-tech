import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  IonContent
} from '@ionic/angular';

import { ProdutosService } from '../../services/produtos.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';

import { TruncatePipe } from '../../pipes/truncate-pipe';
import { CategoriaPipe } from '../../pipes/categoria-pipe';
import { MoedaRealPipe } from '../../pipes/moeda-real-pipe';

import { DestaqueOfertaDirective } from '../../directives/destaque-oferta';
import { EstoqueDirective } from '../../directives/estoque';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    RouterLink,
    CabecalhoComponent,
    RodapeComponent,
    TruncatePipe,
    CategoriaPipe,
    MoedaRealPipe,
    DestaqueOfertaDirective,
    EstoqueDirective
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
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');

      const categoriaValida = this.categorias.some(
        item => item.valor === categoria
      );

      this.categoriaAtual = categoriaValida
        ? categoria!
        : 'laptops';

      this.termoPesquisa = '';
      this.carregarProdutos();
    });
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

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto);
    alert('Produto adicionado ao carrinho!');
  }

}