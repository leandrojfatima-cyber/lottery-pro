import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, BarChart3, Calculator, Trophy, Lock } from 'lucide-react';
import { LOTTERIES, LotteryConfig } from '../data/lotteriesConfig';

interface FerramentasProps {
  onSelectLottery: (id: string) => void;
  onNavigateTab: (tab: 'resultado' | 'estatisticas' | 'conferir' | 'gerador' | 'banco') => void;
  onOpenPro: () => void;
}

export const FerramentasSection: React.FC<FerramentasProps> = ({
  onSelectLottery,
  onNavigateTab,
  onOpenPro
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'gratis' | 'pro'>('all');

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* 1. HERO ESCURO DA CAIXA DE FERRAMENTAS (Idêntico ao print 1) */}
      <section className="bg-[#121824] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Tag Laranja */}
          <div className="text-[11px] font-black uppercase tracking-widest text-[#f97316]">
            CAIXA DE FERRAMENTAS
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-[1.1]">
            Tudo o que o Lottery Pro faz. <br />
            <span className="italic text-[#f97316] font-serif">Organizado por loteria.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Escolha sua loteria, veja o que é grátis e o que o Pro destrava — depois abra a ferramenta e use.
          </p>

          {/* Badges de Contagem */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <strong className="text-white font-black">9</strong> loterias
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <strong className="text-white font-black">87</strong> atalhos diretos
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <strong className="text-white font-black">3</strong> níveis bem identificados
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEGENDA COMO FUNCIONA (Idêntico ao print 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            COMO FUNCIONA
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              GRÁTIS
              <span className="text-emerald-700 font-normal">abre completo sem Pro</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold">
              GRÁTIS + PRO
              <span className="text-blue-700 font-normal">já funciona grátis; o Pro amplia</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
              PRO
              <span className="text-amber-700 font-normal">exclusivo ou com prévia aberta</span>
            </span>
          </div>
        </div>

        {/* 3. BANNER DE DESTAQUE PRO (Idêntico ao print 1) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#172033] to-[#0f172a] text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 text-[11px] font-black uppercase tracking-wider border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>★ PRO</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Todas as ferramentas Pro. Uma compra só.
            </h3>

            <p className="text-xs sm:text-sm text-slate-400">
              9 loterias, acesso vitalício e tudo que entrar no Pro depois.
            </p>
          </div>

          <div className="text-left md:text-right space-y-2 shrink-0">
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              R$ 119,90 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PAGAMENTO ÚNICO</span>
            </div>

            <button
              type="button"
              onClick={onOpenPro}
              className="w-full md:w-auto px-6 py-3 bg-[#e67e22] hover:bg-[#d35400] text-white font-extrabold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Conhecer o Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
              7 DIAS DE GARANTIA · SEM MENSALIDADE
            </div>
          </div>
        </div>

        {/* 4. LISTA DAS LOTERIAS E SEUS ATALHOS DIRETOS */}
        <div className="space-y-10 pt-4">
          {Object.values(LOTTERIES).map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Cabeçalho da Loteria */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${lot.badgeColor}`}>
                    {lot.name}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Próximo: <strong>{lot.nextDraw.premioEstimado}</strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectLottery(lot.id);
                    onNavigateTab('resultado');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver página principal da {lot.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grade de Ferramentas Disponíveis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Conferidor */}
                <div
                  onClick={() => {
                    onSelectLottery(lot.id);
                    onNavigateTab('conferir');
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600">
                      Conferidor
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      GRÁTIS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Marque suas dezenas e confira contra todos os concursos históricos.
                  </p>
                </div>

                {/* 2. Gerador & Fechamento */}
                <div
                  onClick={() => {
                    onSelectLottery(lot.id);
                    onNavigateTab('gerador');
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600">
                      Gerador & Fechamento
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-50 text-blue-700 border border-blue-200">
                      GRÁTIS + PRO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Gere combinações com filtros estatísticos e matrizes de garantia.
                  </p>
                </div>

                {/* 3. Estatísticas */}
                <div
                  onClick={() => {
                    onSelectLottery(lot.id);
                    onNavigateTab('estatisticas');
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50/50 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600">
                      Estatísticas
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      GRÁTIS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Top dezenas mais sorteadas, atrasadas, pares/ímpares e moldura.
                  </p>
                </div>

                {/* 4. Raio-X Pro */}
                <div
                  onClick={onOpenPro}
                  className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 hover:border-amber-400 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 group-hover:text-amber-700">
                      Raio-X Pro
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                      ★ PRO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Análise aprofundada de repetição e ciclos com inteligência preditiva.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
