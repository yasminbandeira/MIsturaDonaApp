import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProdutoService, Produto, ResultadoMistura } from '../../services/produto.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductSearchPage implements OnInit {
  produtos: Produto[] = [];
  produto1: number | null = null;
  produto2: number | null = null;
  resultado: ResultadoMistura | null = null;
  carregando: boolean = false;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtos = this.produtoService.obterProdutos();
  }

  verificarMistura() {
    if (!this.produto1 || !this.produto2) return;

    this.carregando = true;
    setTimeout(() => {
      this.resultado = this.produtoService.verificarMistura(this.produto1!, this.produto2!);
      this.carregando = false;
    }, 500);
  }

  limparResultado() {
    this.resultado = null;
    this.produto1 = null;
    this.produto2 = null;
  }
}
