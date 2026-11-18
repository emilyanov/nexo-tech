import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria',
  standalone: true
})
export class CategoriaPipe implements PipeTransform {

  transform(categoria: string): string {

    const categorias: { [key: string]: string } = {
      'laptops': 'Notebooks',
      'smartphones': 'Smartphones',
      'tablets': 'Tablets',
      'mobile-accessories': 'Acessórios'
    };

    return categorias[categoria] || categoria;
  }

}