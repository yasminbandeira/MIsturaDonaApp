// Componente principal da página de verificação de misturas
// Aqui é onde o usuário seleciona os produtos e vê o resultado
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
  // Lista de produtos disponíveis para seleção
  produtos: Produto[] = [];
  // IDs dos produtos selecionados pelo usuário
  produto1: number | null = null;
  produto2: number | null = null;
  // Resultado da verificação (seguro ou perigoso)
  resultado: ResultadoMistura | null = null;
  // Flag para mostrar spinner de carregamento
  carregando: boolean = false;

  // Injeta o serviço que contém a lógica dos produtos e misturas
  constructor(private produtoService: ProdutoService) { }

  // Ao iniciar, carrega a lista de produtos do serviço
  ngOnInit() {
    this.produtos = this.produtoService.obterProdutos();
  }

  // Função chamada ao clicar em "Verificar Mistura"
  // Simula um carregamento e chama o serviço para verificar se a mistura é segura
  verificarMistura() {
    if (!this.produto1 || !this.produto2) return;

    this.carregando = true;
    setTimeout(() => {
      // Chama a lógica central do app: verifica se a mistura é perigosa
      this.resultado = this.produtoService.verificarMistura(this.produto1!, this.produto2!);
      this.carregando = false;
    }, 500);
  }

  // Função para limpar o resultado e permitir nova verificação
  limparResultado() {
    this.resultado = null;
    this.produto1 = null;
    this.produto2 = null;
  }
}
