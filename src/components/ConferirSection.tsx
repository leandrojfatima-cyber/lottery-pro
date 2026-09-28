import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown, ChevronLeft, ChevronRight, Bookmark, CheckCircle2,
  AlertCircle, Sparkles, Wand2, FileText, Trash2, Trophy, ArrowRight,
  RefreshCw, Check, ArrowDownToLine, Copy
} from 'lucide-react';
import type { User as FirebaseUser } from '../firebase';
import { LotteryConfig } from '../data/lotteriesConfig';
import { fetchLatestCaixaDraw } from '../services/loteriasSyncService';

interface ConferirProps {
  user: FirebaseUser | null;
  lottery: LotteryConfig;
  onOpenAuth: () => void;
}

interface SavedBet {
  id: string;
  concurso: number;
  dezenas: number[];
  data: string;
}

export const ConferirSection: React.FC<ConferirProps> = ({ user, lottery, onOpenAuth }) => {
  const [historyList, setHistoryList] = useState(lottery.sampleHistory);
  const [selectedConcursoNum, setSelectedConcursoNum] = useState<number>(lottery.latestDraw.concurso);
  const [selectedNums, setSelectedNums] = useState<number[]>([]);
  const [conferido, setConferido] = useState(false);
  const [salvoFeedback, setSalvoFeedback] = useState(false);
  const [showColar, setShowColar] = useState(false);
  const [colarTexto, setColarTexto] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(false);
  const [savedBets, setSavedBets] = useState<SavedBet[]>(() => {
    try {
      const saved = localStorage.getItem(`lottery_bets_${lottery.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Atualiza histórico e seleção ao mudar de loteria
  useEffect(() => {
    setHistoryList(lottery.sampleHistory);
    setSelectedConcursoNum(lottery.latestDraw.concurso);
    setSelectedNums([]);
    setConferido(false);
    try {
      const saved = localStorage.getItem(`lottery_bets_${lottery.id}`);
      setSavedBets(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setSavedBets([]);
    }
  }, [lottery]);

  // Encontra o sorteio selecionado de forma infalível
  const currentDraw = useMemo(() => {
    const found = historyList.find((h) => h.c === selectedConcursoNum);
    if (found && Array.isArray(found.d) && found.d.length > 0) {
      return found;
    }
    if (historyList.length > 0 && Array.isArray(historyList[0].d)) {
      return historyList[0];
    }
    return {
      c: lottery.latestDraw.concurso,
      d: lottery.latestDraw.dezenas,
      data: lottery.latestDraw.data
    };
  }, [historyList, selectedConcursoNum, lottery]);

  // Índice atual para as setas anterior / próximo
  const currentIndex = historyList.findIndex(h => h.c === currentDraw.c);

  const handlePrevConcurso = () => {
    if (currentIndex < historyList.length - 1) {
      setSelectedConcursoNum(historyList[currentIndex + 1].c);
      setConferido(false);
    }
  };

  const handleNextConcurso = () => {
    if (currentIndex > 0) {
      setSelectedConcursoNum(historyList[currentIndex - 1].c);
      setConferido(false);
    }
  };

  const toggleNum = (n: number) => {
    setConferido(false);
    if (selectedNums.includes(n)) {
      setSelectedNums(selectedNums.filter((x) => x !== n));
    } else {
      if (selectedNums.length >= lottery.maxBet) return;
      setSelectedNums([...selectedNums, n].sort((a, b) => a - b));
    }
  };

  const handleLimpar = () => {
    setSelectedNums([]);
    setConferido(false);
  };

  const handleSurpresinha = () => {
    const totalBalls = lottery.totalBalls;
    const pool = Array.from({ length: totalBalls }, (_, i) => lottery.id === 'lotomania' ? i : i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setSelectedNums(pool.slice(0, lottery.minBet).sort((a, b) => a - b));
    setConferido(false);
  };

  const handleCarregarDezenasSorteadas = () => {
    if (currentDraw.d && currentDraw.d.length > 0) {
      setSelectedNums([...currentDraw.d].slice(0, lottery.maxBet).sort((a, b) => a - b));
      setConferido(false);
    }
  };

  const handleProcessarColar = () => {
    const matches = colarTexto.match(/\b\d+\b/g);
    if (!matches) return;
    const numbers = Array.from(new Set(matches.map(Number)))
      .filter(n => n >= 1 && n <= lottery.totalBalls)
      .slice(0, lottery.maxBet)
      .sort((a, b) => a - b);

    if (numbers.length > 0) {
      setSelectedNums(numbers);
      setShowColar(false);
      setColarTexto('');
      setConferido(false);
    }
  };

  const handleSalvar = () => {
    if (selectedNums.length < lottery.minBet) return;
    const novoJogo: SavedBet = {
      id: Date.now().toString(),
      concurso: currentDraw.c,
      dezenas: [...selectedNums],
      data: new Date().toLocaleDateString('pt-BR')
    };
    const atualizados = [novoJogo, ...savedBets];
    setSavedBets(atualizados);
    try {
      localStorage.setItem(`lottery_bets_${lottery.id}`, JSON.stringify(atualizados));
    } catch (e) {
      console.error(e);
    }
    setSalvoFeedback(true);
    setTimeout(() => setSalvoFeedback(false), 2500);
  };

  const handleDeleteSavedBet = (id: string) => {
    const atualizados = savedBets.filter(b => b.id !== id);
    setSavedBets(atualizados);
    try {
      localStorage.setItem(`lottery_bets_${lottery.id}`, JSON.stringify(atualizados));
    } catch (e) {
      console.error(e);
    }
  };

  const acertos = selectedNums.filter((n) => currentDraw.d.includes(n));
  const totalBalls = lottery.totalBalls;
  const numbersList = Array.from({ length: totalBalls }, (_, i) => lottery.id === 'lotomania' ? i : i + 1);

  const faltam = Math.max(0, lottery.minBet - selectedNums.length);
  const prontoParaConferir = selectedNums.length >= lottery.minBet;

  // Premiações oficiais
  const calcularPremiacao = (totalAcertos: number) => {
    if (lottery.id === 'lotofacil') {
      if (totalAcertos === 15) return { faixa: '15 acertos (Prêmio Principal)', valor: 'R$ 2.450.812,00', premiado: true };
      if (totalAcertos === 14) return { faixa: '14 acertos', valor: 'R$ 1.840,50', premiado: true };
      if (totalAcertos === 13) return { faixa: '13 acertos', valor: 'R$ 30,00', premiado: true };
      if (totalAcertos === 12) return { faixa: '12 acertos', valor: 'R$ 12,00', premiado: true };
      if (totalAcertos === 11) return { faixa: '11 acertos', valor: 'R$ 6,00', premiado: true };
      return { faixa: 'Menos de 11 acertos', valor: 'R$ 0,00', premiado: false };
    }
    if (lottery.id === 'megasena') {
      if (totalAcertos === 6) return { faixa: 'Sena (6 acertos)', valor: 'R$ 48.000.000,00', premiado: true };
      if (totalAcertos === 5) return { faixa: 'Quina (5 acertos)', valor: 'R$ 48.721,12', premiado: true };
      if (totalAcertos === 4) return { faixa: 'Quadra (4 acertos)', valor: 'R$ 968,40', premiado: true };
      return { faixa: 'Menos de 4 acertos', valor: 'R$ 0,00', premiado: false };
    }
    return {
      faixa: `${totalAcertos} acertos`,
      valor: totalAcertos >= Math.floor(lottery.drawCount * 0.7) ? 'Premiado na faixa' : 'R$ 0,00',
      premiado: totalAcertos >= Math.floor(lottery.drawCount * 0.7)
    };
  };

  const resultadoPremio = calcularPremiacao(acertos.length);

  // Estatísticas do sorteio selecionado
  const somaDezenas = currentDraw.d.reduce((a, b) => a + b, 0);
  const paresCount = currentDraw.d.filter(n => n % 2 === 0).length;
  const imparesCount = currentDraw.d.length - paresCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-150">
      {/* 1. Breadcrumbs e Título Principal (Idêntico ao print) */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <span>INÍCIO</span>
          <span>/</span>
          <span>{lottery.name}</span>
          <span>/</span>
          <span className="text-slate-700">CONFERIR</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Conferidor {lottery.name} — confira seu jogo
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Marque de {lottery.minBet} a {lottery.maxBet} dezenas e confira contra qualquer concurso da {lottery.name}. <strong>Grátis e sem cadastro.</strong>
        </p>
      </div>

      {/* Linha preta divisória superior no topo da ferramenta (exatamente como no print) */}
      <div className="border-t-2 border-slate-900 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Principal da Cartela (8 colunas) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            
            {/* Linha de Concurso e Contador de Selecionadas */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1.5 flex-1 max-w-sm">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    CONCURSO
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Concurso anterior"
                      disabled={currentIndex >= historyList.length - 1}
                      onClick={handlePrevConcurso}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Próximo concurso"
                      disabled={currentIndex <= 0}
                      onClick={handleNextConcurso}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-20 cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Dropdown de Concursos com garantia de sincronização instantânea */}
                <div className="relative">
                  <select
                    value={currentDraw.c}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      setSelectedConcursoNum(num);
                      setConferido(false);
                    }}
                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm font-bold text-slate-800 outline-none cursor-pointer hover:border-slate-400 focus:border-blue-600 transition shadow-2xs"
                  >
                    {historyList.map((draw) => (
                      <option key={draw.c} value={draw.c}>
                        {draw.c} · {draw.data || draw.date}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  SELECIONADAS
                </span>
                <div className="text-3xl font-black text-slate-900 leading-none mt-1">
                  {selectedNums.length} <span className="text-sm text-slate-400 font-bold">/ {lottery.minBet}</span>
                </div>
              </div>
            </div>

            {/* SUAS DEZENAS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  SUAS DEZENAS
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSurpresinha}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Surpresinha</span>
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={() => setShowColar(!showColar)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Colar jogo</span>
                  </button>
                </div>
              </div>

              {/* Caixa para colar jogo */}
              {showColar && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in">
                  <label className="text-xs font-bold text-slate-700 block">
                    Cole as dezenas separadas por espaço, vírgula ou traço:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: 01 03 04 05 06 07 09 11 14 15 16 17 20 21 25"
                      value={colarTexto}
                      onChange={(e) => setColarTexto(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleProcessarColar}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Preencher
                    </button>
                  </div>
                </div>
              )}

              {/* Grade de 01 a 25 em círculos perfeitos (10 por linha) */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5">
                {numbersList.map((num) => {
                  const isSelected = selectedNums.includes(num);
                  const isAcerto = conferido && isSelected && currentDraw.d.includes(num);
                  const isErro = conferido && isSelected && !currentDraw.d.includes(num);

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => toggleNum(num)}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center justify-center select-none active:scale-95 mx-auto ${
                        isAcerto
                          ? 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-md ring-2 ring-emerald-300 scale-105'
                          : isErro
                          ? 'bg-rose-500 text-white border-2 border-rose-500 shadow-sm opacity-85'
                          : isSelected
                          ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-md scale-105'
                          : 'bg-white text-slate-800 border border-slate-300 hover:border-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {String(num).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Barra de Ação Inferior: Selecione X dezenas a mais | Limpar | Salvar | Conferir resultado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              {/* Texto explicativo dinâmico (idêntico ao print) */}
              <div className="text-xs text-slate-500 font-medium">
                {faltam > 0 ? (
                  <span>Selecione <strong>{faltam}</strong> {faltam === 1 ? 'dezena a mais' : 'dezenas a mais'}</span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pronto para conferir! ({selectedNums.length} selecionadas)</span>
                  </span>
                )}
              </div>

              {/* Botões Limpar, Salvar e Conferir resultado */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLimpar}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                >
                  Limpar
                </button>

                <button
                  type="button"
                  onClick={handleSalvar}
                  disabled={!prontoParaConferir}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{salvoFeedback ? '✓ Salvo!' : 'Salvar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConferido(true)}
                  disabled={!prontoParaConferir}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-xs flex items-center gap-1.5 ${
                    prontoParaConferir
                      ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Conferir resultado</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Painel Completo de Apuração da Aposta (Quando conferido) */}
            {conferido && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 shadow-xl border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-md ${
                      resultadoPremio.premiado ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {acertos.length}
                    </div>
                    <div>
                      <div className="text-sm font-black flex items-center gap-2">
                        <span>Você acertou {acertos.length} de {currentDraw.d.length} dezenas</span>
                        {resultadoPremio.premiado && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] uppercase font-bold">
                            Premiado!
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Concurso <strong>#{currentDraw.c}</strong> de {currentDraw.data}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Faixa Oficial
                    </span>
                    <div className="text-xs font-bold text-amber-300">
                      {resultadoPremio.faixa}
                    </div>
                    <div className="text-base font-black text-emerald-400">
                      {resultadoPremio.valor}
                    </div>
                  </div>
                </div>

                {/* Dezenas que você acertou */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">
                      Dezenas Sorteadas que Você Acertou ({acertos.length}):
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {acertos.length > 0 ? (
                      acertos.map(num => (
                        <div
                          key={num}
                          className="w-9 h-9 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-md ring-2 ring-emerald-300/40"
                        >
                          {String(num).padStart(2, '0')}
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">Nenhuma dezena coincidiu neste concurso.</span>
                    )}
                  </div>
                </div>

                {/* Dezenas do seu jogo que NÃO foram sorteadas */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-xs text-slate-400 font-bold">
                    Dezenas Jogadas que Não Saíram:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNums.filter(n => !currentDraw.d.includes(n)).map(num => (
                      <div
                        key={num}
                        className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-white/10"
                      >
                        {String(num).padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Seção de Jogos Salvos do Usuário */}
            {savedBets.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Seus Jogos Salvos ({savedBets.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Deseja limpar todos os jogos salvos?')) {
                        setSavedBets([]);
                        localStorage.removeItem(`lottery_bets_${lottery.id}`);
                      }
                    }}
                    className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Excluir todos
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedBets.map((bet) => {
                    const acertosSaved = bet.dezenas.filter(n => currentDraw.d.includes(n));
                    return (
                      <div
                        key={bet.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedNums(bet.dezenas);
                              setConferido(true);
                            }}
                            className="font-bold text-blue-600 hover:underline cursor-pointer"
                          >
                            Carregar
                          </button>
                          <span className="text-slate-400">·</span>
                          <span className="font-mono text-slate-700">
                            {bet.dezenas.map(n => String(n).padStart(2, '0')).join(' ')}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800">
                            {acertosSaved.length} acertos
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSavedBet(bet.id)}
                            className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Coluna da Direita: Card Dezenas Sorteadas (Fiel à imagem de referência) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {lottery.name} Concurso {currentDraw.c}
                </h3>
              </div>

              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                OFICIAL
              </span>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                DEZENAS SORTEADAS
              </span>

              {/* Bolinhas Azuis Escuras com Números Brancos em grade 3x5 */}
              <div className="grid grid-cols-5 gap-2.5">
                {currentDraw.d.map((num) => {
                  const isUserHit = conferido && selectedNums.includes(num);
                  return (
                    <div
                      key={num}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full font-black text-xs sm:text-sm flex items-center justify-center shadow-xs mx-auto transition-transform ${
                        isUserHit
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 scale-105 shadow-md'
                          : 'bg-[#1e3a8a] text-white'
                      }`}
                    >
                      {String(num).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ação rápida para o usuário: usar este concurso na cartela */}
            <button
              type="button"
              onClick={handleCarregarDezenasSorteadas}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 text-blue-600" />
              <span>Copiar para minha cartela</span>
            </button>

            {/* Resumo Estatístico do Concurso */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Soma</span>
                <span className="text-xs font-black text-slate-800">{somaDezenas}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Pares</span>
                <span className="text-xs font-black text-slate-800">{paresCount}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Ímpares</span>
                <span className="text-xs font-black text-slate-800">{imparesCount}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-right text-[11px] text-slate-400 font-semibold">
              {currentDraw.data} · apuração oficial
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
