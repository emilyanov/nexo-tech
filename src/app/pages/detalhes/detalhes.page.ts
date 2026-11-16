import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/angular';

import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    CommonModule
  ],
})
export class DetalhesPage implements OnInit {

  produto: Produto | null = null;

  carregando = false;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarProduto();
  }

  carregarProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID DO PRODUTO:', id);

    if (!Number.isInteger(id) || id <= 0) {
      this.erro = 'Identificador de produto inválido.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.produtosService.getProdutoPorId(id).subscribe({
      next: (produto) => {
        console.log('PRODUTO RECEBIDO:', produto);

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
}