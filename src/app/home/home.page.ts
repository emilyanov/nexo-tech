import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowForwardOutline,
  hardwareChipOutline,
  chevronBackOutline,
  chevronForwardOutline,
  laptopOutline,
  phonePortraitOutline,
  tabletPortraitOutline,
  headsetOutline,
  cubeOutline,
  cartOutline,
  starOutline
} from 'ionicons/icons';

import { forkJoin } from 'rxjs';

import { ProdutosService } from '../services/produtos.service';
import { CarrinhoService } from '../services/carrinho.service';
import { Produto } from '../models/produto.model';
import { CabecalhoComponent } from '../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../components/rodape/rodape.component';
import { MoedaRealPipe } from '../pipes/moeda-real-pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    CabecalhoComponent,
    RodapeComponent,
    MoedaRealPipe
  ],
})
export class HomePage implements OnInit, OnDestroy {

  slideAtual = 0;

  banners = [
    {
      subtitulo: 'BEM-VINDO À NEXO TECH',
      titulo: 'Conecte-se ao futuro.',
      descricao: 'Descubra tecnologias que transformam seu dia a dia.',
      botao: 'Explorar produtos',
      categoria: ''
    },
    {
      subtitulo: 'DESEMPENHO E PRODUTIVIDADE',
      titulo: 'Potência para suas ideias.',
      descricao: 'Encontre notebooks para estudar, trabalhar e criar.',
      botao: 'Ver notebooks',
      categoria: 'laptops'
    },
    {
      subtitulo: 'TECNOLOGIA EM TODO LUGAR',
      titulo: 'Sua conexão, sem limites.',
      descricao: 'Conheça smartphones, tablets e acessórios.',
      botao: 'Ver dispositivos',
      categoria: 'smartphones'
    }
  ];

  produtosDestaque: Produto[] = [];
  carregandoDestaques = false;
  erroDestaques = '';

  private intervalo: ReturnType<typeof setInterval> | undefined;

  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService
  ) {
    addIcons({
      arrowForwardOutline,
      hardwareChipOutline,
      chevronBackOutline,
      chevronForwardOutline,
      laptopOutline,
      phonePortraitOutline,
      tabletPortraitOutline,
      headsetOutline,
      cubeOutline,
      cartOutline,
      starOutline
    });
  }

  ngOnInit() {
    this.iniciarCarrossel();
    this.carregarDestaques();
  }

  ngOnDestroy() {
    this.pararCarrossel();
  }

  iniciarCarrossel() {
    this.pararCarrossel();

    this.intervalo = setInterval(() => {
      this.proximoSlide();
    }, 5000);
  }

  pararCarrossel() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = undefined;
    }
  }

  proximoSlide() {
    this.slideAtual = (this.slideAtual + 1) % this.banners.length;
  }

  slideAnterior() {
    this.slideAtual =
      (this.slideAtual - 1 + this.banners.length) % this.banners.length;
  }

  selecionarSlide(index: number) {
    this.slideAtual = index;
  }

  carregarDestaques() {
    this.carregandoDestaques = true;
    this.erroDestaques = '';

    const categorias = [
      'laptops',
      'smartphones',
      'tablets',
      'mobile-accessories'
    ];

    const requisicoes = categorias.map(categoria =>
      this.produtosService.getProdutosPorCategoria(categoria)
    );

    forkJoin(requisicoes).subscribe({
      next: (respostas) => {
        this.produtosDestaque = respostas.flatMap(
          resposta => resposta.products.slice(0, 2)
        );

        this.carregandoDestaques = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar destaques:', erro);
        this.erroDestaques = 'Não foi possível carregar os produtos em destaque.';
        this.carregandoDestaques = false;
      }
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto);
    alert('Produto adicionado ao carrinho!');
  }

}