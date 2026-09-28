import React, { useState, useEffect } from 'react';
import { Minus, Plus, ArrowRight, Copy, Check, Sparkles, Bookmark, Share2 } from 'lucide-react';
import { LotteryConfig } from '../data/lotteriesConfig';

interface GeradorProps {
  lottery: LotteryConfig;
  onEnviarParaConferir: (dezenas: number[]) => void;
  onOpenPro: () => void;
}

export const GeradorSection: React.FC<GeradorProps> = ({
  lottery,
  onEnviarParaConferir,
  onOpenPro
}) => {
  const [modo, setModo] = useState<'aleatorio' | 'inteligente' | 'repeticao' | 'fechamento'>('aleatorio');
  const [dezenasPorJogo, setDezenasPorJogo] = useState(lottery.minBet);
  const [quantosJogos, setQuantosJogos] = useState(1);
  const [jogosGerados, setJogosGerados] = useState<number[][]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setDezenasPorJogo(lottery.minBet);
    setQuantosJogos(1);
    setJogosGerados([]);
  }, [lottery]);

  const handleModoClick = (m: 'aleatorio' | 'inteligente' | 'repeticao' | 'fechamento') => {
    if (m !== 'aleatorio') {
      onOpenPro();
      return;
    }
    setModo(m);
  };

  const handleGerarDezenas = () => {
    const totalBalls = lottery.totalBalls;
    const pool = Array.from({ length: totalBalls }, (_, i) => lottery.id === 'lotomania' ? i : i + 1);

    const novosJogos: number[][] = [];
    for (let j = 0; j < quantosJogos; j++) {
      const shuffled = [...pool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[r]] = [shuffled[r], shuffled[i]];
      }
      novosJogos.push(shuffled.slice(0, dezenasPorJogo).sort((a, b) => a - b));
    }
    setJogosGerados(novosJogos);
  };

  const handleCopy = (jogo: number[], index: number) => {
    const text = jogo.map(n => String(n).padStart(2, '0')).join(' - ');
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Breadcrumbs e Título Principal (Idêntico ao print 3) */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <span>INÍCIO</span>
          <span>/</span>
          <span>{lottery.name}</span>
          <span>/</span>
          <span className="text-slate-700">GERADOR</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Gerador {lottery.name} — aleatório, inteligente e fechamento
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Gere jogos da {lottery.name} em 4 modos: <strong>aleatório puro</strong> (grátis) ou <strong>surpresinha inteligente</strong>, <strong>repetição R5/R7</strong> e <strong>fechamento</strong> (Pro). Experimente sem cadastro; crie uma conta para salvar seus bilhetes.
        </p>
      </div>

      {/* 2. Card Principal do Gerador */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Abas do Gerador (Fiel ao print 3) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-slate-50/40 text-xs font-bold">
          <button
            onClick={() => setModo('aleatorio')}
            className={`py-3.5 px-4 text-center transition cursor-pointer border-b-2 ${
              modo === 'aleatorio'
                ? 'border-blue-900 text-blue-900 bg-white font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Aleatório
          </button>

          <button
            onClick={() => handleModoClick('inteligente')}
            className="py-3.5 px-4 text-center transition cursor-pointer border-b-2 border-transparent text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5"
          >
            <span>Surpresinha inteligente</span>
            <span className="text-[10px] text-amber-600 font-black">★ PRO</span>
          </button>

          <button
            onClick={() => handleModoClick('repeticao')}
            className="py-3.5 px-4 text-center transition cursor-pointer border-b-2 border-transparent text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5"
          >
            <span>Repetição</span>
            <span className="text-[10px] text-amber-600 font-black">★ PRO</span>
          </button>

          <button
            onClick={() => handleModoClick('fechamento')}
            className="py-3.5 px-4 text-center transition cursor-pointer border-b-2 border-transparent text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5"
          >
            <span>Fechamento</span>
            <span className="text-[10px] text-amber-600 font-black">★ PRO</span>
          </button>
        </div>

        {/* Controles de Quantidade e Botão Gerar */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* DEZENAS POR JOGO */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                DEZENAS POR JOGO
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setDezenasPorJogo(Math.max(lottery.minBet, dezenasPorJogo - 1))}
                  className="w-14 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-black text-lg text-slate-900">
                  {dezenasPorJogo}
                </div>
                <button
                  type="button"
                  onClick={() => setDezenasPorJogo(Math.min(lottery.maxBet, dezenasPorJogo + 1))}
                  className="w-14 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QUANTOS JOGOS */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                QUANTOS JOGOS
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantosJogos(Math.max(1, quantosJogos - 1))}
                  className="w-14 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-black text-lg text-slate-900">
                  {quantosJogos}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantosJogos(Math.min(20, quantosJogos + 1))}
                  className="w-14 h-12 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Botão Azul Grande: → Gerar dezenas */}
          <button
            type="button"
            onClick={handleGerarDezenas}
            className="w-full py-4 px-6 bg-[#1e3a8a] hover:bg-[#172554] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>→ Gerar dezenas</span>
          </button>
        </div>

        {/* Jogos Gerados com Bolinhas Azuis */}
        {jogosGerados.length > 0 && (
          <div className="p-6 sm:p-8 bg-slate-50/50 border-t border-slate-200 space-y-4 animate-in fade-in">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
              {jogosGerados.length} {jogosGerados.length === 1 ? 'Jogo Gerado' : 'Jogos Gerados'}:
            </h3>

            <div className="space-y-3">
              {jogosGerados.map((jogo, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-xs font-black text-slate-400">
                      #{idx + 1}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {jogo.map((num) => (
                        <div
                          key={num}
                          className="w-8 h-8 rounded-full bg-[#1e3a8a] text-white font-black text-xs flex items-center justify-center shadow-2xs"
                        >
                          {String(num).padStart(2, '0')}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleCopy(jogo, idx)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === idx ? 'Copiado!' : 'Copiar'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onEnviarParaConferir(jogo)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer text-xs font-bold"
                    >
                      Conferir Jogo →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
