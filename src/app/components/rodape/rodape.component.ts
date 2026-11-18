import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss'],
  imports: [
    RouterLink
  ],
})
export class RodapeComponent {
  anoAtual = new Date().getFullYear();
}