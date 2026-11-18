import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonToast
} from '@ionic/angular';

import { ProdutosService } from '../../services/produtos.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';

import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../components/rodape/rodape.component';
import { MoedaRealPipe } from '../../pipes/moeda-real-pipe';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  imports: [
    IonContent,
    IonToast,
    CommonModule,
    RouterLink,
    CabecalhoComponent,
    RodapeComponent,
    MoedaRealPipe
  ],
})
export class DetalhesPage implements OnInit {

  produto: Produto | null = null;
  carregando = false;
  erro = '';

  toastAberto = false;
  mensagemToast = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarProduto();
  }

  carregarProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.erro = 'Identificador de produto inválido.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.produtosService.getProdutoPorId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar detalhes:', erro);
        this.erro = 'Não foi possível carregar os detalhes do produto.';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    if (produto.stock <= 0) {
      return;
    }

    this.carrinhoService.adicionarProduto(produto);
    this.mensagemToast = 'Produto adicionado ao carrinho!';
    this.toastAberto = true;
  }

  comprarAgora(produto: Produto): void {
    if (produto.stock <= 0) {
      return;
    }

    this.carrinhoService.adicionarProduto(produto);
    this.router.navigate(['/carrinho']);
  }

}