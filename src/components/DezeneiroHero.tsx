import React, { useState } from 'react';
import { Bell, ArrowRight, Trophy, Sparkles, Check } from 'lucide-react';
import { LotteryConfig } from '../data/lotteriesConfig';

interface HeroProps {
  lottery: LotteryConfig;
  onConferirClick: () => void;
  onGerarClick: () => void;
}

export const DezeneiroHero: React.FC<HeroProps> = ({
  lottery,
  onConferirClick,
  onGerarClick
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const draw = lottery.latestDraw;
  const next = lottery.nextDraw;

  return (
    <div className="w-full bg-[#fbfcfd] border-b border-slate-200 relative overflow-hidden">
      {/* Padrão de pontos de fundo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Esquerda: Sorteio Oficial */}
          <div className="lg:col-span-8 space-y-6">
            {/* Badge de identificação */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase border shadow-sm ${lottery.badgeColor}`}>
              <span className={`w-2 h-2 rounded-full ${lottery.colorName}`} />
              <span>{lottery.name} · CONCURSO {draw.concurso} · {draw.data}</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Resultado da {lottery.name} <br className="hidden sm:inline" />
              — Concurso {draw.concurso}
            </h1>

            {/* As Dezenas Sorteadas (Círculos com cor oficial e tamanho responsivo mobile) */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 sm:gap-3 py-1">
                {draw.dezenas.map((dez, idx) => (
                  <div
                    key={idx}
                    className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-black text-sm sm:text-base md:text-xl shadow-md select-none cursor-default border ${lottery.ballBg} ${lottery.ballBorder} ${lottery.ballText}`}
                  >
                    {lottery.id === 'federal' ? String(dez) : String(dez).padStart(2, '0')}
                  </div>
                ))}
              </div>

              {/* Informação Extra (Trevos na Milionária, Time na Timemania, Mês no Dia de Sorte, 2º Sorteio na Dupla Sena) */}
              {draw.extra && (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">{draw.extra.label}:</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {draw.extra.values.map((v, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-[11px] sm:text-xs rounded-full">
                        {String(v)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Estatísticas resumidas abaixo das dezenas - Grid responsivo 2x2 no mobile */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-semibold pt-2 border-t border-slate-200/80">
              <div className="bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">· SOMA</span>
                <span className="text-slate-900 font-extrabold text-sm">{draw.soma}</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-200" />
              <div className="bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">· PARES</span>
                <span className="text-slate-900 font-extrabold text-sm">{draw.pares}</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-200" />
              <div className="bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">· ÍMPARES</span>
                <span className="text-slate-900 font-extrabold text-sm">{draw.impares}</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-200" />
              <div className="bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg col-span-2 sm:col-span-1">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">· ATRASADAS</span>
                <span className="text-slate-900 font-extrabold text-xs sm:text-sm">{draw.atrasadas.join(' · ')}</span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onConferirClick}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs tracking-wider uppercase hover:bg-slate-800 transition shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>Conferir Minha Aposta na {lottery.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onGerarClick}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs tracking-wider uppercase hover:bg-slate-50 transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Gerar Palpite Inteligente</span>
              </button>
            </div>
          </div>

          {/* Coluna Direita: Canhoto "PRÓXIMO CONCURSO" */}
          <div className="lg:col-span-4">
            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
              <div className="h-2.5 w-full bg-slate-100 flex items-center justify-around overflow-hidden border-b border-slate-200">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-slate-200 -mt-2" />
                ))}
              </div>

              <div className="p-6 sm:p-7 space-y-4">
                <div className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase">
                  PRÓXIMO CONCURSO
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {next.concurso}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {next.data}
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-4">
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    Estimativa de prêmio:
                  </div>
                  <div className="text-3xl sm:text-4xl font-black italic text-[#c88500] tracking-tight">
                    {next.premioEstimado}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={onConferirClick}
                    className="w-full py-3.5 px-4 bg-slate-950 text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Conferir meu jogo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSubscribed(!subscribed)}
                    className={`w-full py-2.5 px-4 border text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer ${
                      subscribed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Notificações Ativadas!</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-slate-500" />
                        <span>Receba o próximo no celular</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tabela de Premiação Oficial da Loteria */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Premiação Oficial — {lottery.name} #{draw.concurso}</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Valores oficiais Caixa Econômica Federal</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="pb-3">Faixa de Premiação</th>
                  <th className="pb-3">Ganhadores</th>
                  <th className="pb-3 text-right">Prêmio por Aposta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {draw.premiacao.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-800 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-amber-500' : 'bg-slate-400'}`} />
                      <span>{item.faixa}</span>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">{item.ganhadores}</td>
                    <td className={`py-3 text-right font-extrabold ${idx === 0 ? 'text-emerald-600 font-black' : 'text-slate-800'}`}>
                      {item.premio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
