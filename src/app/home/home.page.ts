import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  arrowForwardOutline,
  hardwareChipOutline,
  chevronBackOutline,
  chevronForwardOutline,
  laptopOutline,
  phonePortraitOutline,
  tabletPortraitOutline,
  headsetOutline,
  cubeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon
  ],
})
export class HomePage implements OnInit, OnDestroy {

  slideAtual = 0;

  banners = [
    {
      subtitulo: 'BEM-VINDO À NEXO TECH',
      titulo: 'Conecte-se ao futuro.',
      descricao: 'Descubra tecnologias que transformam seu dia a dia.',
      botao: 'Explorar produtos'
    },
    {
      subtitulo: 'DESEMPENHO E PRODUTIVIDADE',
      titulo: 'Potência para suas ideias.',
      descricao: 'Encontre notebooks para estudar, trabalhar e criar.',
      botao: 'Ver notebooks'
    },
    {
      subtitulo: 'TECNOLOGIA EM TODO LUGAR',
      titulo: 'Sua conexão, sem limites.',
      descricao: 'Conheça smartphones, tablets e acessórios.',
      botao: 'Ver dispositivos'
    }
  ];

  private intervalo: ReturnType<typeof setInterval> | undefined;

  constructor() {
    addIcons({
      cartOutline,
      arrowForwardOutline,
      hardwareChipOutline,
      chevronBackOutline,
      chevronForwardOutline,
      laptopOutline,
      phonePortraitOutline,
      tabletPortraitOutline,
      headsetOutline,
      cubeOutline
    });
  }

  ngOnInit() {
    this.iniciarCarrossel();
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
}