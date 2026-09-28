import React, { useState } from 'react';
import { BarChart3, TrendingUp, Flame, Clock, Hash, Percent, Layers, PieChart, Info } from 'lucide-react';
import { LotteryConfig } from '../data/lotteriesConfig';

interface EstatisticasProps {
  lottery: LotteryConfig;
}

export const EstatisticasSection: React.FC<EstatisticasProps> = ({ lottery }) => {
  const [tema, setTema] = useState<'mais_saem' | 'atrasadas' | 'soma' | 'par_impar' | 'moldura'>('mais_saem');
  const [periodo, setPeriodo] = useState<'50' | '100' | '500' | 'all'>('100');

  // Amostra baseada no período
  const limit = periodo === '50' ? 50 : periodo === '100' ? 100 : periodo === '500' ? 500 : lottery.sampleHistory.length;
  const historySlice = lottery.sampleHistory.slice(0, Math.min(limit, lottery.sampleHistory.length));
  const amostraCount = historySlice.length;

  const totalBalls = lottery.totalBalls;
  const freq = Array(totalBalls + 1).fill(0);
  const lastSeen = Array(totalBalls + 1).fill(-1);

  let totalDezenasSorteadas = 0;
  let totalPares = 0;
  let totalPrimos = 0;

  // Análise de Moldura (na Lotofácil, dezenas 1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25 são moldura)
  const molduraLotofacil = [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25];

  const somas: number[] = [];
  const distParImpar: Record<string, number> = {};
  const distMoldura: Record<string, number> = {};

  const isPrimo = (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  historySlice.forEach((c, idx) => {
    let somaConcurso = 0;
    let paresConcurso = 0;
    let molduraConcurso = 0;

    c.d.forEach((num) => {
      if (num >= 0 && num <= totalBalls) {
        freq[num]++;
        if (lastSeen[num] === -1) {
          lastSeen[num] = idx;
        }
        totalDezenasSorteadas++;
        somaConcurso += num;
        if (num % 2 === 0) paresConcurso++;
        if (isPrimo(num)) totalPrimos++;
        if (molduraLotofacil.includes(num)) molduraConcurso++;
      }
    });

    somas.push(somaConcurso);
    totalPares += paresConcurso;

    const imparesConcurso = c.d.length - paresConcurso;
    const chaveParImpar = `${paresConcurso}P / ${imparesConcurso}I`;
    distParImpar[chaveParImpar] = (distParImpar[chaveParImpar] || 0) + 1;

    const chaveMoldura = `${molduraConcurso} Moldura / ${c.d.length - molduraConcurso} Miolo`;
    distMoldura[chaveMoldura] = (distMoldura[chaveMoldura] || 0) + 1;
  });

  const pctPares = totalDezenasSorteadas > 0 ? Math.round((totalPares / totalDezenasSorteadas) * 100) : 46;
  const pctPrimos = totalDezenasSorteadas > 0 ? Math.round((totalPrimos / totalDezenasSorteadas) * 100) : 36;
  const mediaSoma = somas.length > 0 ? Math.round(somas.reduce((a, b) => a + b, 0) / somas.length) : 185;

  // Ordenação de dezenas
  const rankedDezenas = Array.from({ length: totalBalls }, (_, i) => {
    const num = lottery.id === 'lotomania' ? i : i + 1;
    const atraso = lastSeen[num] === -1 ? amostraCount : lastSeen[num];
    return {
      n: num,
      count: freq[num] || 0,
      atraso: atraso
    };
  });

  if (tema === 'atrasadas') {
    rankedDezenas.sort((a, b) => b.atraso - a.atraso);
  } else {
    rankedDezenas.sort((a, b) => b.count - a.count);
  }

  const maxVal = tema === 'atrasadas'
    ? Math.max(1, ...rankedDezenas.map(d => d.atraso))
    : Math.max(1, ...rankedDezenas.map(d => d.count));

  const ultimoConcursoNum = lottery.sampleHistory[0]?.c || 3790;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-150">
      {/* 1. Breadcrumbs e Título Principal (Idêntico ao print 1) */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <span>INÍCIO</span>
          <span>/</span>
          <span>{lottery.name}</span>
          <span>/</span>
          <span className="text-slate-700">ESTATÍSTICAS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Estatísticas da {lottery.name}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Análise dos últimos <strong>{amostraCount}</strong> concursos da {lottery.name}. Último computado: <strong>concurso {ultimoConcursoNum}</strong>.
        </p>
      </div>

      {/* 2. Filtros: POR TEMA e PERÍODO */}
      <div className="space-y-4 pt-2">
        {/* POR TEMA */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            POR TEMA:
          </span>
          <button
            onClick={() => setTema('atrasadas')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              tema === 'atrasadas'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Dezenas atrasadas
          </button>
          <button
            onClick={() => setTema('mais_saem')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              tema === 'mais_saem'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Que mais saem
          </button>
          <button
            onClick={() => setTema('soma')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              tema === 'soma'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Soma das dezenas
          </button>
          <button
            onClick={() => setTema('par_impar')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              tema === 'par_impar'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Pares e ímpares
          </button>
          <button
            onClick={() => setTema('moldura')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              tema === 'moldura'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Moldura e miolo
          </button>
        </div>

        {/* PERÍODO */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            PERÍODO:
          </span>
          <button
            onClick={() => setPeriodo('50')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              periodo === '50'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Últimos 50
          </button>
          <button
            onClick={() => setPeriodo('100')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              periodo === '100'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Últimos 100
          </button>
          <button
            onClick={() => setPeriodo('500')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              periodo === '500'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Últimos 500
          </button>
          <button
            onClick={() => setPeriodo('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer border ${
              periodo === 'all'
                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Todos
          </button>
        </div>
      </div>

      {/* 3. Cards de Métricas Principais (Pares, Primas, Amostra) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
        <div className="border-r-0 sm:border-r border-slate-200 pr-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            DEZENAS PARES
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
            {pctPares}%
          </div>
          <span className="text-xs text-slate-500 font-medium">dos números sorteados</span>
        </div>

        <div className="border-r-0 sm:border-r border-slate-200 pr-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            DEZENAS PRIMAS
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
            {pctPrimos}%
          </div>
          <span className="text-xs text-slate-500 font-medium">dos números sorteados</span>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            AMOSTRA
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
            {amostraCount}
          </div>
          <span className="text-xs text-slate-500 font-medium">concursos analisados</span>
        </div>
      </div>

      {/* 4. Renderização Condicional com Base no Tema Selecionado */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        {/* TEMA: SOMA DAS DEZENAS */}
        {tema === 'soma' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Soma das Dezenas Sorteadas
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Média histórica da soma das dezenas nos últimos {amostraCount} concursos: <strong>{mediaSoma}</strong> (Faixa ideal: 170 a 210).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Menor Soma</span>
                <span className="text-2xl font-black text-slate-900">{Math.min(...somas)}</span>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Média Histórica</span>
                <span className="text-2xl font-black text-blue-600">{mediaSoma}</span>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Maior Soma</span>
                <span className="text-2xl font-black text-slate-900">{Math.max(...somas)}</span>
              </div>
            </div>
          </div>
        )}

        {/* TEMA: PARES E ÍMPARES */}
        {tema === 'par_impar' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Distribuição de Pares e Ímpares
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Frequência de ocorrência de padrões par/ímpar nos {amostraCount} concursos mais recentes.
              </p>
            </div>

            <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              {Object.entries(distParImpar)
                .sort((a, b) => b[1] - a[1])
                .map(([padrao, qtd]) => {
                  const pct = Math.round((qtd / amostraCount) * 100);
                  return (
                    <div key={padrao} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-bold text-slate-700">{padrao}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="w-16 text-right text-xs font-black text-slate-800">
                        {qtd} ({pct}%)
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TEMA: MOLDURA E MIOLO */}
        {tema === 'moldura' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Distribuição de Moldura e Miolo
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Proporção entre as 16 dezenas da moldura e as 9 dezenas do centro do volante.
              </p>
            </div>

            <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              {Object.entries(distMoldura)
                .sort((a, b) => b[1] - a[1])
                .map(([padrao, qtd]) => {
                  const pct = Math.round((qtd / amostraCount) * 100);
                  return (
                    <div key={padrao} className="flex items-center gap-3">
                      <div className="w-36 text-xs font-bold text-slate-700">{padrao}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div className="bg-[#1b3577] h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="w-16 text-right text-xs font-black text-slate-800">
                        {qtd} ({pct}%)
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TEMA: DEZENAS ATRASADAS OU QUE MAIS SAEM */}
        {(tema === 'mais_saem' || tema === 'atrasadas') && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {tema === 'atrasadas' ? 'Dezenas mais atrasadas' : 'Frequência de cada dezena'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {tema === 'atrasadas'
                  ? `Há quantos concursos cada dezena não é sorteada na amostra de ${amostraCount}.`
                  : `Quantas vezes cada dezena apareceu nos ${amostraCount} concursos mais recentes.`}
              </p>
            </div>

            <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              {rankedDezenas.map((item, index) => {
                const val = tema === 'atrasadas' ? item.atraso : item.count;
                const pctBar = Math.round((val / maxVal) * 100);

                return (
                  <div key={item.n} className="flex items-center gap-3 sm:gap-4 group">
                    {/* Posição */}
                    <div className="w-7 text-xs font-black text-slate-400 text-right shrink-0">
                      {index + 1}º
                    </div>

                    {/* Bolinha da Dezena */}
                    <div className="w-8 h-8 rounded-full bg-[#d35400] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                      {String(item.n).padStart(2, '0')}
                    </div>

                    {/* Barra Laranja */}
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#d35400] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(5, pctBar)}%` }}
                      />
                    </div>

                    {/* Valor Total */}
                    <div className="w-10 text-right text-xs font-bold text-slate-700 shrink-0">
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
