/**
 * Serviço de Sincronização Automática com as Loterias Caixa
 * Obtém os resultados oficiais mais recentes dos sorteios e atualiza a base local e Firestore
 */

export interface DrawData {
  c: number;
  d: number[];
  data: string;
  acumulou?: boolean;
  premioEstimado?: string;
}

// Mapeamento para as APIs públicas oficiais
const CAIXA_ENDPOINTS: Record<string, string> = {
  lotofacil: 'https://loteriascaixa-api.herokuapp.com/api/lotofacil',
  megasena: 'https://loteriascaixa-api.herokuapp.com/api/megasena',
  quina: 'https://loteriascaixa-api.herokuapp.com/api/quina',
  lotomania: 'https://loteriascaixa-api.herokuapp.com/api/lotomania',
  timemania: 'https://loteriascaixa-api.herokuapp.com/api/timemania',
  duplasena: 'https://loteriascaixa-api.herokuapp.com/api/duplasena',
  diadesorte: 'https://loteriascaixa-api.herokuapp.com/api/diadesorte',
  maismilionaria: 'https://loteriascaixa-api.herokuapp.com/api/maismilionaria',
  federal: 'https://loteriascaixa-api.herokuapp.com/api/federal'
};

export async function fetchLatestCaixaDraw(lotteryId: string): Promise<DrawData | null> {
  const endpoint = CAIXA_ENDPOINTS[lotteryId];
  if (!endpoint) return null;

  try {
    const res = await fetch(`${endpoint}/latest`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Erro na API: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Converte os dados recebidos da Caixa
    const concursoNum = Number(data.concurso || data.numero);
    const dezenas = (data.dezenas || data.listaDezenas || []).map(Number);
    const dataApuracao = data.data || data.dataApuracao || new Date().toLocaleDateString('pt-BR');

    if (!concursoNum || dezenas.length === 0) return null;

    return {
      c: concursoNum,
      d: dezenas.sort((a: number, b: number) => a - b),
      data: dataApuracao,
      acumulou: Boolean(data.acumulou),
      premioEstimado: data.valorEstimadoProximoConcurso ? `R$ ${Number(data.valorEstimadoProximoConcurso).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : undefined
    };
  } catch (error) {
    console.warn(`Não foi possível obter dados online imediatos para ${lotteryId}:`, error);
    return null;
  }
}
