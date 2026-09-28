import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Ticket, ShieldCheck, Zap } from 'lucide-react';
import { LOTTERIES } from '../data/lotteriesConfig';

interface HomeSectionProps {
  onSelectLottery: (id: string) => void;
  onNavigateTab: (tab: 'resultado' | 'estatisticas' | 'conferir' | 'gerador' | 'ferramentas') => void;
  onOpenPro: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onSelectLottery,
  onNavigateTab,
  onOpenPro
}) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 1. HERO PRINCIPAL DA HOME (Idêntico ao print 3) */}
      <section className="relative overflow-hidden bg-[#faf8f5] border-b border-stone-200 py-12 md:py-20">
        {/* Padrão pontilhado sutil de fundo (estilo papel milimetrado) */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado Esquerdo: Chamada Principal */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>5 SORTEIOS HOJE · SEGUNDA-FEIRA</span>
              </div>

              {/* Título Principal Imponente */}
              <h1 className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight leading-[1.08]">
                Hoje tem <br className="hidden sm:inline" />
                <span className="italic text-[#c25e1a] font-serif">R$ 26 milhões</span> em <br className="hidden sm:inline" />
                jogo.
              </h1>

              {/* Subtítulo */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
                Resultados de <strong>Lotofácil</strong>, <strong>Mega-Sena</strong>, <strong>Quina</strong>, <strong>Lotomania</strong> e mais — atualizados após cada sorteio, com estatísticas e ferramentas grátis.
                <br />
                <span className="italic text-slate-400 block mt-1">
                  Sem sensacionalismo. Só os números que importam.
                </span>
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('resultado')}
                  className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-md active:scale-95"
                >
                  Ver sorteios e prêmios
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('ferramentas')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm rounded-xl border border-slate-300 transition cursor-pointer shadow-2xs active:scale-95"
                >
                  O que dá pra fazer aqui
                </button>
              </div>
            </div>

            {/* Lado Direito: CUPOM FISCAL / EXTRATO DE LOTÉRICA REALISTA (Idêntico ao print 3) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 font-mono text-slate-800 relative space-y-5">
                {/* Cabeçalho do Extrato */}
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-stone-300">
                  <div className="flex items-center gap-1.5 font-sans font-black text-lg text-slate-900">
                    <span className="flex gap-1 items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </span>
                    <span>LOTTERY <span className="text-blue-600">PRO</span></span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400">
                    28/09 · SEG
                  </div>
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  EXTRATO · SORTEIOS DE HOJE
                </div>

                {/* Lista de Sorteios de Hoje */}
                <div className="space-y-3.5 text-xs">
                  {/* Quina */}
                  <div 
                    onClick={() => { onSelectLottery('quina'); onNavigateTab('resultado'); }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-purple-700">
                        <span className="w-2 h-2 rounded-full bg-purple-600" />
                        <span>QUINA</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        conc. 6543 · hoje, 21h
                      </div>
                    </div>
                    <div className="font-black text-slate-900 text-sm">
                      R$ 12 mi
                    </div>
                  </div>

                  {/* Lotomania */}
                  <div 
                    onClick={() => { onSelectLottery('lotomania'); onNavigateTab('resultado'); }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-rose-700">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                        <span>LOTOMANIA</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        conc. 2679 · hoje, 21h
                      </div>
                    </div>
                    <div className="font-black text-slate-900 text-sm">
                      R$ 6 mi
                    </div>
                  </div>

                  {/* Dupla Sena */}
                  <div 
                    onClick={() => { onSelectLottery('duplasena'); onNavigateTab('resultado'); }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-red-700">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        <span>DUPLA SENA</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        conc. 2719 · hoje, 21h
                      </div>
                    </div>
                    <div className="font-black text-slate-900 text-sm">
                      R$ 6 mi
                    </div>
                  </div>

                  {/* Lotofácil */}
                  <div 
                    onClick={() => { onSelectLottery('lotofacil'); onNavigateTab('resultado'); }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-indigo-700">
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                        <span>LOTOFÁCIL</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        conc. 3791 · hoje, 21h
                      </div>
                    </div>
                    <div className="font-black text-slate-900 text-sm">
                      R$ 2 mi
                    </div>
                  </div>

                  {/* Dia de Sorte */}
                  <div 
                    onClick={() => { onSelectLottery('diadesorte'); onNavigateTab('resultado'); }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-yellow-700">
                        <span className="w-2 h-2 rounded-full bg-yellow-600" />
                        <span>DIA DE SORTE</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                        conc. 969 · hoje, 21h
                      </div>
                    </div>
                    <div className="font-black text-slate-900 text-sm">
                      R$ 800 mil
                    </div>
                  </div>
                </div>

                {/* Linha Divisória Tracejada */}
                <div className="border-t border-dashed border-stone-300 pt-3 flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                    TOTAL EM JOGO
                  </div>
                  <div className="text-xl font-serif font-black italic text-[#c25e1a]">
                    R$ 26 mi
                  </div>
                </div>

                {/* Código de barras ilustrativo e realista */}
                <div className="pt-2 text-center space-y-1">
                  <div className="flex justify-center items-center h-9 tracking-widest text-slate-800 select-none overflow-hidden text-2xl font-black">
                    ||| | |||| | || |||| | ||| |||| | ||| ||||
                  </div>
                  <div className="text-[9px] text-slate-400 tracking-widest font-sans uppercase font-bold">
                    LOTTERYPRO.COM.BR
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ATALHOS RÁPIDOS POR LOTERIA NA HOME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Acesse sua loteria favorita
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Resultados apurados, conferidor ao vivo e geradores com desdobramento.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('ferramentas')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas as 9 loterias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(LOTTERIES).slice(0, 6).map((lot) => (
            <div
              key={lot.id}
              onClick={() => {
                onSelectLottery(lot.id);
                onNavigateTab('resultado');
              }}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${lot.badgeColor}`}>
                  {lot.name}
                </span>
                <span className="text-xs font-black text-slate-900">
                  {lot.nextDraw.premioEstimado}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-xs text-slate-400 font-bold">
                  Último concurso #{lot.latestDraw.concurso}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lot.latestDraw.dezenas.slice(0, 8).map((d) => (
                    <span
                      key={d}
                      className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center"
                    >
                      {String(d).padStart(2, '0')}
                    </span>
                  ))}
                  {lot.latestDraw.dezenas.length > 8 && (
                    <span className="text-xs text-slate-400 font-bold self-center">
                      +{lot.latestDraw.dezenas.length - 8}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-blue-600">
                <span>Abrir ferramentas da {lot.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
