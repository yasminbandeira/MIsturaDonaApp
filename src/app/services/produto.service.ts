// Serviço central do app: contém a base de dados dos produtos e a lógica de verificação das misturas
import { Injectable } from '@angular/core';

// Interface para componentes químicos de cada produto
export interface Componente {
  nome: string;
  formula: string;
}

// Interface para cada produto de limpeza
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  componentes: Componente[];
  advertencias: string[];
}

// Interface do resultado da verificação
export interface ResultadoMistura {
  seguro: boolean;
  mensagem: string;
  motivo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // Base de dados de produtos com seus componentes químicos
  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Água Sanitária',
      descricao: 'Agua sanitária comum para limpeza e desinfecção',
      componentes: [
        { nome: 'Hipoclorito de Sódio', formula: 'NaOCl' },
        { nome: 'Hidróxido de Sódio', formula: 'NaOH' },
        { nome: 'Água', formula: 'H2O' }
      ],
      advertencias: [
        'Não misturar com outros produtos de limpeza',
        'Manter fora do alcance de crianças',
        'Usar em local bem ventilado'
      ]
    },
    {
      id: 2,
      nome: 'Detergente Neutro',
      descricao: 'Detergente líquido para limpeza geral',
      componentes: [
        { nome: 'Lauril Sulfato de Sódio', formula: 'C12H25SO4Na' },
        { nome: 'Tensoativos', formula: 'Diversos' },
        { nome: 'Água', formula: 'H2O' }
      ],
      advertencias: [
        'Manter fora do alcance de crianças',
        'Em caso de contato com os olhos, lavar com água em abundância'
      ]
    },
    {
      id: 3,
      nome: 'Desinfetante',
      descricao: 'Desinfetante para limpeza geral',
      componentes: [
        { nome: 'Cloreto de Benzalcônio', formula: 'C6H5CH2N(CH3)2Cl' },
        { nome: 'Água', formula: 'H2O' },
        { nome: 'Fragrância', formula: 'Diversos' }
      ],
      advertencias: [
        'Não ingerir',
        'Manter fora do alcance de crianças',
        'Evitar contato com pele'
      ]
    },
    {
      id: 4,
      nome: 'Álcool 70%',
      descricao: 'Álcool para limpeza e desinfecção',
      componentes: [
        { nome: 'Álcool Etílico', formula: 'C2H5OH' },
        { nome: 'Água', formula: 'H2O' }
      ],
      advertencias: [
        'Produto inflamável',
        'Manter longe do fogo e do calor',
        'Manter em local bem ventilado'
      ]
    },
    {
      id: 5,
      nome: 'Produto Multiuso',
      descricao: 'Limpador multiuso para superfícies',
      componentes: [
        { nome: 'Lauril Éter Sulfato de Sódio', formula: 'C12H25O(CH2CH2O)nSO4Na' },
        { nome: 'Solventes Orgânicos', formula: 'Diversos' },
        { nome: 'Água', formula: 'H2O' }
      ],
      advertencias: [
        'Não misturar com outros produtos',
        'Manter fora do alcance de crianças',
        'Usar em local bem ventilado'
      ]
    },
    {
      id: 6,
      nome: 'Amoníaco',
      descricao: 'Solução de amônia para limpeza',
      componentes: [
        { nome: 'Hidróxido de Amônia', formula: 'NH4OH' },
        { nome: 'Água', formula: 'H2O' }
      ],
      advertencias: [
        'Odor forte e irritante',
        'Manter fora do alcance de crianças',
        'Não inalар vapores'
      ]
    },
    {
      id: 7,
      nome: 'Cloro em Pó',
      descricao: 'Cloro em pó para desinfecção de piscinas e superfícies',
      componentes: [
        { nome: 'Hipoclorito de Cálcio', formula: 'Ca(OCl)2' },
        { nome: 'Cálcio', formula: 'Ca' }
      ],
      advertencias: [
        'Extremamente irritante',
        'Manter em local seco e arejado',
        'Nunca misturar com outros produtos'
      ]
    },
    {
      id: 8,
      nome: 'Vinagre Branco',
      descricao: 'Vinagre branco para limpeza natural',
      componentes: [
        { nome: 'Ácido Acético', formula: 'CH3COOH' },
        { nome: 'Água', formula: 'H2O' }
      ],
      advertencias: [
        'Pode causar irritação em concentrações altas',
        'Odor forte'
      ]
    }
  ];

  // Matriz de incompatibilidades: pares de componentes químicos que são perigosos juntos
  private incompatibilidades = [
    {
      componente1: 'Hipoclorito de Sódio',
      componente2: 'Hidróxido de Amônia',
      motivo: 'Gera tóxicos cancerígenos (cloraminas e cloro gasoso) que causam problemas respiratórios graves'
    },
    {
      componente1: 'Hipoclorito de Sódio',
      componente2: 'Álcool Etílico',
      motivo: 'Pode gerar compostos tóxicos e vapores perigosos'
    },
    {
      componente1: 'Hipoclorito de Sódio',
      componente2: 'Ácido Acético',
      motivo: 'Produz cloro gasoso, altamente tóxico e irritante para os pulmões'
    },
    {
      componente1: 'Hipoclorito de Sódio',
      componente2: 'Lauril Éter Sulfato de Sódio',
      motivo: 'Pode liberar gases tóxicos ao reagir com surfactantes'
    },
    {
      componente1: 'Hipoclorito de Cálcio',
      componente2: 'Hidróxido de Amônia',
      motivo: 'Gera tóxicos cancerígenos (cloraminas e cloro gasoso)'
    },
    {
      componente1: 'Hipoclorito de Cálcio',
      componente2: 'Ácido Acético',
      motivo: 'Produz cloro gasoso, altamente tóxico'
    },
    {
      componente1: 'Hidróxido de Amônia',
      componente2: 'Hipoclorito de Sódio',
      motivo: 'Gera cloraminas (tóxicas) e pode causar danos aos pulmões'
    },
    {
      componente1: 'Solventes Orgânicos',
      componente2: 'Hipoclorito de Sódio',
      motivo: 'Pode gerar vapores tóxicos e reações exotérmicas'
    }
  ];

  constructor() { }

  /**
   * Retorna todos os produtos disponíveis
   */
  obterProdutos(): Produto[] {
    return this.produtos;
  }

  /**
   * Retorna um produto pelo ID
   */
  obterProduto(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  /**
   * Verifica a compatibilidade entre dois produtos
   */
  verificarMistura(produtoId1: number, produtoId2: number): ResultadoMistura {
    const produto1 = this.obterProduto(produtoId1);
    const produto2 = this.obterProduto(produtoId2);

    if (!produto1 || !produto2) {
      return {
        seguro: false,
        mensagem: 'Um ou ambos os produtos não foram encontrados'
      };
    }

    if (produtoId1 === produtoId2) {
      return {
        seguro: true,
        mensagem: `Você pode usar ${produto1.nome} sozinho sem problemas!`
      };
    }

    // Verifica se há alguma incompatibilidade entre os componentes
    for (const incomp of this.incompatibilidades) {
      const temComponente1NoProduto1 = produto1.componentes.some(
        c => c.nome === incomp.componente1
      );
      const temComponente2NoProduto2 = produto2.componentes.some(
        c => c.nome === incomp.componente2
      );

      if (temComponente1NoProduto1 && temComponente2NoProduto2) {
        return {
          seguro: false,
          mensagem: `⚠️ MISTURA PERIGOSA! ⚠️`,
          motivo: incomp.motivo
        };
      }

      // Verifica também a ordem inversa
      const temComponente2NoProduto1 = produto1.componentes.some(
        c => c.nome === incomp.componente2
      );
      const temComponente1NoProduto2 = produto2.componentes.some(
        c => c.nome === incomp.componente1
      );

      if (temComponente2NoProduto1 && temComponente1NoProduto2) {
        return {
          seguro: false,
          mensagem: `⚠️ MISTURA PERIGOSA! ⚠️`,
          motivo: incomp.motivo
        };
      }
    }

    return {
      seguro: true,
      mensagem: `✓ Mistura Segura`,
      motivo: `A mistura de ${produto1.nome} com ${produto2.nome} é segura para uso.`
    };
  }
}