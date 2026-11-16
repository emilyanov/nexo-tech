import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Produto, RespostaProdutos } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProdutosPorCategoria(categoria: string): Observable<RespostaProdutos> {
    return this.http.get<RespostaProdutos>(
      `${this.apiUrl}/category/${categoria}`
    );
  }

  pesquisarProdutos(termo: string): Observable<RespostaProdutos> {
    return this.http.get<RespostaProdutos>(
      `${this.apiUrl}/search?q=${encodeURIComponent(termo)}`
    );
  }

  getProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.apiUrl}/${id}`
    );
  }
}