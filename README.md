# Nexo Tech

Aplicativo de uma loja fictícia de tecnologia, desenvolvido com Ionic e Angular standalone para a disciplina de Mobile.

Permite explorar produtos, consultar detalhes, montar um carrinho e confirmar pedidos simulados para retirada na loja.

## Funcionalidades

- Catálogo de notebooks, tablets, smartphones e acessórios.
- Pesquisa de produtos pelo nome.
- Filtro por categoria.
- Visualização de fotos, descrição, preço e avaliação.
- Carrinho com controle de quantidades e cálculo do total.
- Confirmação de pedidos para retirada na loja.
- Histórico de pedidos salvo no dispositivo.

O aplicativo tem finalidade acadêmica. Os produtos e preços são demonstrativos, e não há processamento de pagamentos ou compras reais.

## Páginas

| Página | Descrição |
|---|---|
| Home | Apresentação da loja, categorias e produtos em destaque. |
| Catálogo | Listagem, pesquisa e filtro de produtos. |
| Detalhes | Informações do produto e opção de adicionar ao carrinho. |
| Carrinho | Revisão dos itens, ajuste de quantidades e confirmação do pedido. |
| Meus pedidos | Consulta dos pedidos registrados e seus respectivos itens. |

## Tecnologias

- Ionic
- Angular standalone
- TypeScript
- HTML e SCSS
- Angular HttpClient
- localStorage

## API

O aplicativo utiliza a [DummyJSON](https://dummyjson.com/docs/products) para consultar os produtos.

As requisições incluem:

- Listagem de produtos por categoria.
- Consulta de produto pelo ID.
- Pesquisa de produtos pelo nome.

O carrinho e os pedidos são gerenciados pelo aplicativo e armazenados localmente no dispositivo.

## Recursos do Angular

- Services para integração com a API e gerenciamento do carrinho e dos pedidos.
- Pipes builtins para formatação de valores e datas.
- Pipes personalizadas para resumo de descrições e tradução de categorias.
- Diretivas personalizadas para destaque de ofertas e indicação de produtos no carrinho.
- Blocos @if e @for para renderização condicional e exibição de listas.
- Parâmetros de rota para navegação até os detalhes dos produtos.

## Como executar

### Pré-requisitos

- Node.js e npm
- Ionic CLI

Para instalar o Ionic CLI:

    npm install -g @ionic/cli

### Instalação

Clone o repositório:

    git clone https://github.com/emilyanov/nexo-tech.git

Acesse a pasta:

    cd nexo-tech

Instale as dependências:

    npm install

Inicie o servidor de desenvolvimento:

    ionic serve

Acesse http://localhost:8100 no navegador.

## Equipe

- Emilyano da Silva Vasconcelos
- Luann Gabriell de Farias da Paz
- Mateus Gustavo da Silva
- Álvaro José de Lira Oliveira
- Hewerton Philipe
- Maria Dalila