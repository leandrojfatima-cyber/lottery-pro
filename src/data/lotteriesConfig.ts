export interface HistoryItem {
  c: number;
  n: number;
  d: number[];
  data: string;
  date: string;
}

export interface LotteryConfig {
  id: string;
  name: string;
  colorName: string;
  badgeColor: string;
  ballBg: string;
  ballBorder: string;
  ballText: string;
  totalBalls: number;
  drawCount: number;
  minBet: number;
  maxBet: number;
  costUnit: number;
  latestDraw: {
    concurso: number;
    data: string;
    dezenas: number[];
    extra?: { label: string; values: (string | number)[] };
    soma: number;
    pares: number;
    impares: number;
    atrasadas: string[];
    premiacao: { faixa: string; ganhadores: string; premio: string }[];
  };
  nextDraw: {
    concurso: number;
    data: string;
    premioEstimado: string;
  };
  sampleHistory: HistoryItem[];
}

export const LOTTERIES: Record<string, LotteryConfig> = {
  lotofacil: {
    id: 'lotofacil',
    name: 'LOTOFÁCIL',
    colorName: 'bg-indigo-600',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    ballBg: 'bg-[#1b3577]',
    ballBorder: 'border-[#2b4c9e]',
    ballText: 'text-white',
    totalBalls: 25,
    drawCount: 15,
    minBet: 15,
    maxBet: 20,
    costUnit: 3.50,
    latestDraw: {
      concurso: 3790,
      data: 'DOMINGO 27/09/2026',
      dezenas: [1, 3, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 20, 21, 25],
      soma: 174,
      pares: 5,
      impares: 10,
      atrasadas: ['02', '10', '22'],
      premiacao: [
        { faixa: '15 acertos', ganhadores: '0 apostas ganhadoras (Acumulou!)', premio: 'R$ 2.000.000,00' },
        { faixa: '14 acertos', ganhadores: '526 apostas', premio: 'R$ 2.259,58' },
        { faixa: '13 acertos', ganhadores: '18.700 apostas', premio: 'R$ 35,00' },
        { faixa: '12 acertos', ganhadores: '165.168 apostas', premio: 'R$ 14,00' },
        { faixa: '11 acertos', ganhadores: '1.023.464 apostas', premio: 'R$ 7,00' }
      ]
    },
    nextDraw: {
      concurso: 3791,
      data: 'segunda-feira 28/09/2026 · 21h',
      premioEstimado: 'R$ 2.000.000'
    },
    sampleHistory: [
      { c: 3790, n: 3790, d: [1, 3, 4, 5, 6, 7, 9, 11, 14, 15, 16, 17, 20, 21, 25], data: '27/09/2026', date: '27/09/2026' },
      { c: 3789, n: 3789, d: [6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23, 25], data: '25/09/2026', date: '25/09/2026' },
      { c: 3788, n: 3788, d: [1, 2, 4, 7, 8, 10, 11, 12, 14, 16, 18, 20, 22, 23, 24], data: '24/09/2026', date: '24/09/2026' },
      { c: 3787, n: 3787, d: [2, 3, 5, 6, 8, 9, 10, 13, 15, 17, 19, 20, 21, 24, 25], data: '23/09/2026', date: '23/09/2026' },
      { c: 3786, n: 3786, d: [1, 4, 5, 7, 9, 11, 12, 14, 15, 16, 18, 20, 22, 23, 25], data: '22/09/2026', date: '22/09/2026' },
      { c: 3785, n: 3785, d: [2, 3, 4, 6, 8, 10, 11, 13, 15, 17, 19, 21, 22, 24, 25], data: '21/09/2026', date: '21/09/2026' },
      { c: 3784, n: 3784, d: [1, 3, 5, 7, 8, 9, 12, 14, 16, 17, 18, 20, 22, 23, 25], data: '20/09/2026', date: '20/09/2026' },
      { c: 3783, n: 3783, d: [2, 4, 6, 7, 9, 10, 11, 13, 15, 16, 18, 19, 21, 23, 24], data: '18/09/2026', date: '18/09/2026' },
      { c: 3782, n: 3782, d: [1, 2, 3, 5, 8, 9, 11, 12, 14, 16, 17, 20, 22, 24, 25], data: '17/09/2026', date: '17/09/2026' },
      { c: 3781, n: 3781, d: [3, 4, 6, 7, 8, 10, 12, 13, 15, 18, 19, 20, 21, 23, 25], data: '16/09/2026', date: '16/09/2026' },
      { c: 3780, n: 3780, d: [1, 4, 5, 6, 9, 10, 11, 14, 15, 16, 17, 19, 22, 24, 25], data: '15/09/2026', date: '15/09/2026' },
      { c: 3779, n: 3779, d: [2, 3, 5, 7, 8, 9, 11, 13, 14, 16, 18, 20, 21, 23, 25], data: '03/09/2026', date: '03/09/2026' },
      { c: 3778, n: 3778, d: [1, 2, 4, 6, 7, 10, 12, 13, 15, 17, 18, 19, 22, 24, 25], data: '02/09/2026', date: '02/09/2026' },
      { c: 3777, n: 3777, d: [3, 5, 6, 8, 9, 11, 12, 14, 15, 16, 18, 20, 21, 23, 24], data: '01/09/2026', date: '01/09/2026' },
      { c: 3776, n: 3776, d: [1, 3, 4, 7, 8, 10, 11, 13, 15, 17, 19, 20, 22, 23, 25], data: '31/08/2026', date: '31/08/2026' },
      { c: 3775, n: 3775, d: [2, 4, 5, 6, 9, 10, 12, 14, 16, 17, 18, 21, 22, 24, 25], data: '30/08/2026', date: '30/08/2026' },
      { c: 3774, n: 3774, d: [1, 2, 3, 6, 7, 8, 11, 13, 15, 16, 18, 19, 20, 23, 25], data: '28/08/2026', date: '28/08/2026' },
      { c: 3773, n: 3773, d: [4, 5, 7, 8, 9, 10, 12, 14, 15, 17, 19, 21, 22, 24, 25], data: '27/08/2026', date: '27/08/2026' },
      { c: 3772, n: 3772, d: [1, 3, 5, 6, 8, 10, 11, 13, 14, 16, 18, 20, 22, 23, 24], data: '26/08/2026', date: '26/08/2026' },
      { c: 3771, n: 3771, d: [2, 4, 6, 7, 9, 11, 12, 15, 16, 17, 19, 20, 21, 24, 25], data: '25/08/2026', date: '25/08/2026' },
      { c: 3770, n: 3770, d: [1, 2, 5, 7, 8, 10, 13, 14, 15, 17, 18, 20, 22, 23, 25], data: '24/08/2026', date: '24/08/2026' },
      { c: 3769, n: 3769, d: [3, 4, 6, 8, 9, 11, 12, 14, 16, 17, 19, 21, 22, 24, 25], data: '23/08/2026', date: '23/08/2026' },
      { c: 3768, n: 3768, d: [1, 3, 5, 7, 9, 10, 12, 13, 15, 16, 18, 20, 21, 23, 24], data: '22/08/2026', date: '22/08/2026' },
      { c: 3767, n: 3767, d: [2, 4, 6, 7, 8, 10, 11, 14, 15, 17, 19, 20, 22, 24, 25], data: '21/08/2026', date: '21/08/2026' },
      { c: 3766, n: 3766, d: [1, 2, 4, 5, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 25], data: '20/08/2026', date: '20/08/2026' },
      { c: 3765, n: 3765, d: [3, 5, 6, 7, 9, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25], data: '19/08/2026', date: '19/08/2026' },
      { c: 3764, n: 3764, d: [1, 3, 4, 6, 8, 10, 11, 14, 15, 16, 19, 20, 21, 23, 25], data: '18/08/2026', date: '18/08/2026' },
      { c: 3763, n: 3763, d: [2, 4, 5, 7, 8, 9, 12, 13, 15, 17, 18, 20, 22, 24, 25], data: '17/08/2026', date: '17/08/2026' },
      { c: 3762, n: 3762, d: [1, 2, 3, 6, 7, 10, 11, 13, 14, 16, 18, 19, 21, 23, 24], data: '15/08/2026', date: '15/08/2026' },
      { c: 3761, n: 3761, d: [3, 5, 6, 8, 9, 11, 12, 15, 16, 17, 19, 20, 22, 24, 25], data: '14/08/2026', date: '14/08/2026' },
      { c: 3760, n: 3760, d: [1, 4, 5, 7, 8, 10, 12, 13, 14, 16, 18, 20, 21, 23, 25], data: '13/08/2026', date: '13/08/2026' },
      { c: 3759, n: 3759, d: [2, 3, 6, 7, 9, 10, 11, 14, 15, 17, 19, 20, 22, 24, 25], data: '12/08/2026', date: '12/08/2026' },
      { c: 3758, n: 3758, d: [1, 2, 4, 5, 8, 9, 12, 13, 15, 16, 18, 20, 21, 23, 24], data: '11/08/2026', date: '11/08/2026' },
      { c: 3757, n: 3757, d: [3, 4, 6, 7, 8, 10, 11, 13, 15, 17, 18, 19, 22, 24, 25], data: '10/08/2026', date: '10/08/2026' },
      { c: 3756, n: 3756, d: [1, 3, 5, 7, 9, 10, 12, 14, 15, 16, 18, 20, 21, 23, 25], data: '08/08/2026', date: '08/08/2026' },
      { c: 3755, n: 3755, d: [2, 4, 6, 8, 9, 11, 13, 14, 16, 17, 19, 21, 22, 24, 25], data: '07/08/2026', date: '07/08/2026' },
      { c: 3754, n: 3754, d: [1, 2, 4, 5, 7, 9, 10, 12, 14, 15, 17, 18, 20, 23, 25], data: '06/08/2026', date: '06/08/2026' },
      { c: 3753, n: 3753, d: [3, 5, 6, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 24, 25], data: '05/08/2026', date: '05/08/2026' },
      { c: 3752, n: 3752, d: [1, 3, 4, 7, 8, 9, 12, 13, 15, 16, 18, 20, 21, 23, 24], data: '04/08/2026', date: '04/08/2026' },
      { c: 3751, n: 3751, d: [2, 4, 6, 7, 9, 10, 12, 14, 15, 17, 18, 21, 22, 24, 25], data: '03/08/2026', date: '03/08/2026' },
      { c: 3750, n: 3750, d: [1, 2, 3, 5, 8, 10, 11, 13, 14, 16, 17, 19, 20, 23, 25], data: '01/08/2026', date: '01/08/2026' }
    ]
  },

  megasena: {
    id: 'megasena',
    name: 'MEGA-SENA',
    colorName: 'bg-emerald-600',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    ballBg: 'bg-[#0f6b43]',
    ballBorder: 'border-[#17965f]',
    ballText: 'text-white',
    totalBalls: 60,
    drawCount: 6,
    minBet: 6,
    maxBet: 20,
    costUnit: 5.00,
    latestDraw: {
      concurso: 2780,
      data: 'SÁBADO 26/09/2026',
      dezenas: [7, 14, 23, 31, 42, 58],
      soma: 175,
      pares: 3,
      impares: 3,
      atrasadas: ['18', '29', '44'],
      premiacao: [
        { faixa: '6 acertos (Sena)', ganhadores: '0 apostas ganhadoras (Acumulou!)', premio: 'R$ 45.000.000,00' },
        { faixa: '5 acertos (Quina)', ganhadores: '84 apostas', premio: 'R$ 48.721,12' },
        { faixa: '4 acertos (Quadra)', ganhadores: '6.120 apostas', premio: 'R$ 968,40' }
      ]
    },
    nextDraw: {
      concurso: 2781,
      data: 'terça-feira 29/09/2026 · 20h',
      premioEstimado: 'R$ 52.000.000'
    },
    sampleHistory: [
      { c: 2780, n: 2780, d: [7, 14, 23, 31, 42, 58], data: '26/09/2026', date: '26/09/2026' },
      { c: 2779, n: 2779, d: [4, 11, 28, 36, 45, 59], data: '24/09/2026', date: '24/09/2026' },
      { c: 2778, n: 2778, d: [3, 17, 24, 38, 41, 52], data: '22/09/2026', date: '22/09/2026' },
      { c: 2777, n: 2777, d: [9, 15, 22, 33, 49, 60], data: '19/09/2026', date: '19/09/2026' },
      { c: 2776, n: 2776, d: [2, 10, 27, 34, 46, 55], data: '17/09/2026', date: '17/09/2026' },
      { c: 2775, n: 2775, d: [5, 18, 29, 35, 47, 51], data: '15/09/2026', date: '15/09/2026' },
      { c: 2774, n: 2774, d: [8, 16, 21, 39, 44, 57], data: '12/09/2026', date: '12/09/2026' },
      { c: 2773, n: 2773, d: [1, 13, 25, 32, 40, 58], data: '10/09/2026', date: '10/09/2026' }
    ]
  },

  quina: {
    id: 'quina',
    name: 'QUINA',
    colorName: 'bg-purple-600',
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    ballBg: 'bg-[#401275]',
    ballBorder: 'border-[#6223ab]',
    ballText: 'text-white',
    totalBalls: 80,
    drawCount: 5,
    minBet: 5,
    maxBet: 15,
    costUnit: 2.50,
    latestDraw: {
      concurso: 6542,
      data: 'SÁBADO 26/09/2026',
      dezenas: [12, 28, 39, 54, 71],
      soma: 204,
      pares: 3,
      impares: 2,
      atrasadas: ['03', '47', '79'],
      premiacao: [
        { faixa: '5 acertos (Quina)', ganhadores: '1 aposta ganhadora', premio: 'R$ 14.850.210,40' },
        { faixa: '4 acertos (Quadra)', ganhadores: '112 apostas', premio: 'R$ 8.940,20' },
        { faixa: '3 acertos (Terno)', ganhadores: '8.430 apostas', premio: 'R$ 112,00' }
      ]
    },
    nextDraw: {
      concurso: 6543,
      data: 'segunda-feira 28/09/2026 · 20h',
      premioEstimado: 'R$ 1.500.000'
    },
    sampleHistory: [
      { c: 6542, n: 6542, d: [12, 28, 39, 54, 71], data: '26/09/2026', date: '26/09/2026' },
      { c: 6541, n: 6541, d: [5, 19, 33, 48, 62], data: '25/09/2026', date: '25/09/2026' },
      { c: 6540, n: 6540, d: [8, 22, 41, 57, 75], data: '24/09/2026', date: '24/09/2026' },
      { c: 6539, n: 6539, d: [14, 29, 36, 50, 68], data: '23/09/2026', date: '23/09/2026' }
    ]
  },

  lotomania: {
    id: 'lotomania',
    name: 'LOTOMANIA',
    colorName: 'bg-rose-600',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    ballBg: 'bg-[#8c1d40]',
    ballBorder: 'border-[#b82654]',
    ballText: 'text-white',
    totalBalls: 99,
    drawCount: 20,
    minBet: 50,
    maxBet: 50,
    costUnit: 3.00,
    latestDraw: {
      concurso: 2678,
      data: 'SEXTA-FEIRA 25/09/2026',
      dezenas: [3, 8, 14, 22, 29, 35, 41, 48, 52, 59, 63, 67, 71, 78, 80, 84, 89, 91, 95, 98],
      soma: 1088,
      pares: 10,
      impares: 10,
      atrasadas: ['17', '55', '73'],
      premiacao: [
        { faixa: '20 acertos', ganhadores: '0 apostas ganhadoras', premio: 'R$ 7.200.000,00' },
        { faixa: '19 acertos', ganhadores: '8 apostas', premio: 'R$ 38.450,10' }
      ]
    },
    nextDraw: {
      concurso: 2679,
      data: 'segunda-feira 28/09/2026 · 20h',
      premioEstimado: 'R$ 8.000.000'
    },
    sampleHistory: [
      { c: 2678, n: 2678, d: [3, 8, 14, 22, 29, 35, 41, 48, 52, 59, 63, 67, 71, 78, 80, 84, 89, 91, 95, 98], data: '25/09/2026', date: '25/09/2026' }
    ]
  },

  timemania: {
    id: 'timemania',
    name: 'TIMEMANIA',
    colorName: 'bg-amber-600',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    ballBg: 'bg-[#996515]',
    ballBorder: 'border-[#c2862b]',
    ballText: 'text-white',
    totalBalls: 80,
    drawCount: 7,
    minBet: 10,
    maxBet: 10,
    costUnit: 3.50,
    latestDraw: {
      concurso: 2145,
      data: 'SÁBADO 26/09/2026',
      dezenas: [11, 24, 38, 45, 59, 67, 78],
      extra: { label: 'Time do Coração', values: ['FLAMENGO / RJ'] },
      soma: 322,
      pares: 4,
      impares: 3,
      atrasadas: ['07', '31', '62'],
      premiacao: [
        { faixa: '7 acertos', ganhadores: '0 apostas', premio: 'R$ 18.500.000,00' }
      ]
    },
    nextDraw: {
      concurso: 2146,
      data: 'terça-feira 29/09/2026 · 20h',
      premioEstimado: 'R$ 19.200.000'
    },
    sampleHistory: [
      { c: 2145, n: 2145, d: [11, 24, 38, 45, 59, 67, 78], data: '26/09/2026', date: '26/09/2026' }
    ]
  },

  duplasena: {
    id: 'duplasena',
    name: 'DUPLA SENA',
    colorName: 'bg-red-600',
    badgeColor: 'text-red-700 bg-red-50 border-red-200',
    ballBg: 'bg-[#8f1d1d]',
    ballBorder: 'border-[#bd2828]',
    ballText: 'text-white',
    totalBalls: 50,
    drawCount: 6,
    minBet: 6,
    maxBet: 15,
    costUnit: 2.50,
    latestDraw: {
      concurso: 2718,
      data: 'SEXTA-FEIRA 25/09/2026',
      dezenas: [5, 14, 21, 33, 42, 49],
      extra: { label: '2º Sorteio', values: [8, 17, 26, 31, 38, 45] },
      soma: 164,
      pares: 2,
      impares: 4,
      atrasadas: ['12', '27', '44'],
      premiacao: [
        { faixa: '6 acertos (1º Sorteio)', ganhadores: '0 apostas', premio: 'R$ 3.800.000,00' }
      ]
    },
    nextDraw: {
      concurso: 2719,
      data: 'segunda-feira 28/09/2026 · 20h',
      premioEstimado: 'R$ 4.200.000'
    },
    sampleHistory: [
      { c: 2718, n: 2718, d: [5, 14, 21, 33, 42, 49], data: '25/09/2026', date: '25/09/2026' }
    ]
  },

  diadesorte: {
    id: 'diadesorte',
    name: 'DIA DE SORTE',
    colorName: 'bg-yellow-600',
    badgeColor: 'text-yellow-800 bg-yellow-50 border-yellow-200',
    ballBg: 'bg-[#946e11]',
    ballBorder: 'border-[#b88c1c]',
    ballText: 'text-white',
    totalBalls: 31,
    drawCount: 7,
    minBet: 7,
    maxBet: 15,
    costUnit: 2.50,
    latestDraw: {
      concurso: 968,
      data: 'SÁBADO 26/09/2026',
      dezenas: [3, 9, 14, 18, 22, 27, 30],
      extra: { label: 'Mês de Sorte', values: ['OUTUBRO'] },
      soma: 123,
      pares: 4,
      impares: 3,
      atrasadas: ['05', '19', '31'],
      premiacao: [
        { faixa: '7 acertos', ganhadores: '1 aposta ganhadora', premio: 'R$ 1.150.000,00' }
      ]
    },
    nextDraw: {
      concurso: 969,
      data: 'terça-feira 29/09/2026 · 20h',
      premioEstimado: 'R$ 350.000'
    },
    sampleHistory: [
      { c: 968, n: 968, d: [3, 9, 14, 18, 22, 27, 30], data: '26/09/2026', date: '26/09/2026' }
    ]
  },

  maismilionaria: {
    id: 'maismilionaria',
    name: '+MILIONÁRIA',
    colorName: 'bg-teal-600',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    ballBg: 'bg-[#0e5c54]',
    ballBorder: 'border-[#177a70]',
    ballText: 'text-white',
    totalBalls: 50,
    drawCount: 6,
    minBet: 6,
    maxBet: 12,
    costUnit: 6.00,
    latestDraw: {
      concurso: 182,
      data: 'SÁBADO 26/09/2026',
      dezenas: [4, 15, 23, 31, 42, 48],
      extra: { label: 'Trevos', values: [2, 5] },
      soma: 163,
      pares: 3,
      impares: 3,
      atrasadas: ['11', '37', '50'],
      premiacao: [
        { faixa: '6 acertos + 2 trevos', ganhadores: '0 apostas ganhadoras', premio: 'R$ 115.000.000,00' }
      ]
    },
    nextDraw: {
      concurso: 183,
      data: 'quarta-feira 30/09/2026 · 20h',
      premioEstimado: 'R$ 120.000.000'
    },
    sampleHistory: [
      { c: 182, n: 182, d: [4, 15, 23, 31, 42, 48], data: '26/09/2026', date: '26/09/2026' }
    ]
  },

  federal: {
    id: 'federal',
    name: 'FEDERAL',
    colorName: 'bg-blue-700',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    ballBg: 'bg-[#12427a]',
    ballBorder: 'border-[#1b5cb0]',
    ballText: 'text-white',
    totalBalls: 99999,
    drawCount: 5,
    minBet: 1,
    maxBet: 1,
    costUnit: 4.00,
    latestDraw: {
      concurso: 5904,
      data: 'SÁBADO 26/09/2026',
      dezenas: [38541, 19234, 76812, 54903, 81029],
      extra: { label: '1º Prêmio', values: ['Bilhete 38.541'] },
      soma: 0,
      pares: 0,
      impares: 0,
      atrasadas: [],
      premiacao: [
        { faixa: '1º Prêmio (Bilhete 38.541)', ganhadores: '1 ganhador', premio: 'R$ 500.000,00' }
      ]
    },
    nextDraw: {
      concurso: 5905,
      data: 'quarta-feira 30/09/2026 · 19h',
      premioEstimado: 'R$ 500.000'
    },
    sampleHistory: [
      { c: 5904, n: 5904, d: [38541, 19234, 76812, 54903, 81029], data: '26/09/2026', date: '26/09/2026' }
    ]
  }
};
