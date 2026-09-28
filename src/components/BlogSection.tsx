import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, X, Sparkles, Share2, Bookmark, Check } from 'lucide-react';
import { BLOG_ARTICLES, ArtigoBlog } from '../data/blogArticles';
import { BlogIllustration } from './BlogIllustration';

interface BlogSectionProps {
  onNavigateTab: (tab: 'resultado' | 'estatisticas' | 'conferir' | 'gerador') => void;
  onSelectLottery?: (id: string) => void;
  onOpenPro?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onNavigateTab,
  onSelectLottery,
  onOpenPro
}) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todos' | 'lotofacil' | 'megasena' | 'geral'>('todos');
  const [emailNewsletter, setEmailNewsletter] = useState('');
  const [assinado, setAssinado] = useState(false);
  const [artigoModal, setArtigoModal] = useState<ArtigoBlog | null>(null);

  const artigosFiltrados = BLOG_ARTICLES.filter((art) => {
    if (categoriaAtiva === 'todos') return true;
    return art.categoria === categoriaAtiva;
  });

  const countLotofacil = BLOG_ARTICLES.filter(a => a.categoria === 'lotofacil').length;
  const countMegasena = BLOG_ARTICLES.filter(a => a.categoria === 'megasena').length;
  const countGeral = BLOG_ARTICLES.filter(a => a.categoria === 'geral').length;

  const artigoDestaque = BLOG_ARTICLES[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailNewsletter) return;
    setAssinado(true);
    setTimeout(() => {
      setEmailNewsletter('');
      setAssinado(false);
    }, 4000);
  };

  return (
    <div className="bg-[#faf8f5] min-h-screen text-slate-800">
      {/* 1. BARRA HORIZONTAL COM AS 9 LOTERIAS E BOLINHAS COLORIDAS (Fiel às capturas de tela) */}
      <div className="border-b border-stone-200 bg-white/90 sticky top-16 z-30 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto py-3 text-[11px] font-black uppercase tracking-wider text-slate-600 no-scrollbar">
            <button
              onClick={() => { onSelectLottery?.('lotofacil'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>LOTOFÁCIL</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('megasena'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>MEGA-SENA</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('quina'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              <span>QUINA</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('timemania'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span>TIMEMANIA</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('maismilionaria'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span>+MILIONÁRIA</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('lotomania'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>LOTOMANIA</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('diadesorte'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-600" />
              <span>DIA DE SORTE</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('duplasena'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>DUPLA SENA</span>
            </button>

            <button
              onClick={() => { onSelectLottery?.('federal'); onNavigateTab('resultado'); }}
              className="flex items-center gap-2 hover:text-slate-900 transition shrink-0 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span>FEDERAL</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* 2. CABEÇALHO DO BLOG (Idêntico ao print 1) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>INÍCIO</span>
              <span>/</span>
              <span className="text-slate-700">BLOG</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight">
              Blog
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
              Análises honestas, explicações matemáticas e cobertura editorial das loterias brasileiras. <strong>Sem sensacionalismo — só os números que importam.</strong>
            </p>
          </div>

          <div className="text-xs font-bold text-slate-400 sm:text-right shrink-0">
            <strong>{BLOG_ARTICLES.length}</strong> artigos publicados
          </div>
        </div>

        {/* 3. ABAS DE CATEGORIA COM SUBLINHADO INFERIOR ATIVO (Idêntico ao print 1) */}
        <div className="border-b border-stone-300 flex items-center gap-8 text-xs font-black tracking-wider uppercase">
          <button
            onClick={() => setCategoriaAtiva('todos')}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              categoriaAtiva === 'todos'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            TODOS <span className="opacity-60 ml-1">{BLOG_ARTICLES.length}</span>
          </button>

          <button
            onClick={() => setCategoriaAtiva('lotofacil')}
            className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'lotofacil'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>LOTOFÁCIL</span>
            <span className="opacity-60 ml-0.5">{countLotofacil}</span>
          </button>

          <button
            onClick={() => setCategoriaAtiva('megasena')}
            className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'megasena'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>MEGA-SENA</span>
            <span className="opacity-60 ml-0.5">{countMegasena}</span>
          </button>

          <button
            onClick={() => setCategoriaAtiva('geral')}
            className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              categoriaAtiva === 'geral'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>GERAL</span>
            <span className="opacity-60 ml-0.5">{countGeral}</span>
          </button>
        </div>

        {/* 4. GRID PRINCIPAL: ARTIGO DESTAQUE COM INFOGRÁFICO + NEWSLETTER + LEITURAS RECENTES (Idêntico ao print 1 e 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Esquerdo: Artigo Destaque do Final Zero (8 colunas) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="text-[11px] font-black uppercase tracking-widest text-[#d97706] flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#d97706]" />
              <span>DESTAQUE</span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-9 shadow-xs space-y-7">
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                  — LOTTERY PRO / ENTENDA A CONTA
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                  O que muda no concurso final zero?
                </h2>
              </div>

              {/* Sub-bloco 1: CONCURSO REGULAR com as 4 Fatias Coloridas (Idêntico ao print 1) */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  CONCURSO REGULAR
                </div>

                <div className="w-full h-11 rounded-lg overflow-hidden flex font-mono text-[11px] font-bold text-white text-center shadow-2xs">
                  <div className="bg-[#1b2a47] flex flex-col justify-center items-center" style={{ width: '62%' }}>
                    <span className="font-black text-xs">62%</span>
                    <span className="text-[9px] text-slate-300 font-sans font-medium">15 acertos</span>
                  </div>
                  <div className="bg-[#c27818] flex flex-col justify-center items-center" style={{ width: '13%' }}>
                    <span className="font-black text-xs">13%</span>
                    <span className="text-[9px] text-amber-100 font-sans font-medium">14</span>
                  </div>
                  <div className="bg-[#3b628a] flex flex-col justify-center items-center" style={{ width: '10%' }}>
                    <span className="font-black text-xs">10%</span>
                    <span className="text-[9px] text-blue-100 font-sans font-medium">reserva</span>
                  </div>
                  <div className="bg-[#537553] flex flex-col justify-center items-center" style={{ width: '15%' }}>
                    <span className="font-black text-xs">15%</span>
                    <span className="text-[9px] text-emerald-100 font-sans font-medium">Independência</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  Depois das faixas fixas, 10% fica reservado para o próximo final zero.
                </p>
              </div>

              {/* Sub-bloco 2: CONCURSO FINAL ZERO com as 3 Fatias Coloridas (Idêntico ao print 1) */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  CONCURSO FINAL ZERO
                </div>

                <div className="w-full h-11 rounded-lg overflow-hidden flex font-mono text-[11px] font-bold text-white text-center shadow-2xs">
                  <div className="bg-[#1b2a47] flex flex-col justify-center items-center" style={{ width: '72%' }}>
                    <span className="font-black text-xs">72%</span>
                    <span className="text-[9px] text-slate-300 font-sans font-medium">15 acertos</span>
                  </div>
                  <div className="bg-[#c27818] flex flex-col justify-center items-center" style={{ width: '13%' }}>
                    <span className="font-black text-xs">13%</span>
                    <span className="text-[9px] text-amber-100 font-sans font-medium">14</span>
                  </div>
                  <div className="bg-[#537553] flex flex-col justify-center items-center" style={{ width: '15%' }}>
                    <span className="font-black text-xs">15%</span>
                    <span className="text-[9px] text-emerald-100 font-sans font-medium">Independência</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  A reserva de 10% reforça a faixa de 15; a chance e o preço da aposta não mudam.
                </p>
              </div>

              {/* Nota de rodapé da fonte oficial (Idêntico ao print 1) */}
              <div className="text-[11px] text-slate-400">
                Percentuais sobre a parte variável da premiação, após as faixas fixas. Fonte: CAIXA, 28/09/2026.
              </div>

              {/* Texto de resumo e link para ler artigo (Idêntico ao print 2) */}
              <div className="pt-4 border-t border-stone-100 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  O concurso Lotofácil terminado em zero usa uma reserva acumulada para reforçar a faixa de 15 acertos. Entenda o rateio, sem promessa de prêmio.
                </p>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setArtigoModal(artigoDestaque)}
                    className="text-xs font-black text-slate-900 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer group"
                  >
                    <span>Ler artigo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 font-medium">
                    <span>#lotofacil</span>
                    <span>#premios</span>
                    <span>#rateio</span>
                    <span>#regras</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Lado Direito: NEWSLETTER + LEITURAS RECENTES (Idêntico ao print 1) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Card Newsletter */}
            <div className="bg-[#111827] text-white p-7 rounded-2xl shadow-xl space-y-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                NEWSLETTER
              </div>

              <h3 className="text-xl font-serif font-black tracking-tight text-white leading-snug">
                Resumão da semana, todo domingo
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Resultados, acumulados e os melhores artigos da semana. Zero spam — cancela quando quiser.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={emailNewsletter}
                  onChange={(e) => setEmailNewsletter(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-amber-500 transition"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs rounded-xl transition cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>{assinado ? '✓ Inscrito com sucesso!' : 'Assinar'}</span>
                </button>
              </form>
            </div>

            {/* 2. Card Leituras Recentes (Idêntico ao print 1) */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                LEITURAS RECENTES
              </div>

              <div className="space-y-5 divide-y divide-stone-100">
                {/* 01 */}
                <div 
                  onClick={() => setArtigoModal(BLOG_ARTICLES[7])}
                  className="pt-2 first:pt-0 flex items-start gap-4 group cursor-pointer"
                >
                  <span className="text-2xl font-serif font-black text-[#d97706] shrink-0">
                    01
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Bilhete de loteria é ao portador? Como se proteger
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      21 de set · 4 min
                    </span>
                  </div>
                </div>

                {/* 02 */}
                <div 
                  onClick={() => setArtigoModal(BLOG_ARTICLES[1])}
                  className="pt-4 flex items-start gap-4 group cursor-pointer"
                >
                  <span className="text-2xl font-serif font-black text-[#d97706] shrink-0">
                    02
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Como conferir a Lotofácil pelo celular
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      14 de set · 3 min
                    </span>
                  </div>
                </div>

                {/* 03 */}
                <div 
                  onClick={() => setArtigoModal(BLOG_ARTICLES[2])}
                  className="pt-4 flex items-start gap-4 group cursor-pointer"
                >
                  <span className="text-2xl font-serif font-black text-[#d97706] shrink-0">
                    03
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      Apostar datas de aniversário na Lotofácil faz sentido?
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      07 de set · 5 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 5. SEÇÃO MAIS RECENTES — RENDERIZANDO TODOS OS 28 ARTIGOS (Idêntico às 4 capturas de tela) */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
              Mais recentes
            </h3>
            <span className="text-xs font-bold text-slate-400">
              {artigosFiltrados.slice(1).length} artigos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artigosFiltrados.slice(1).map((art) => (
              <div
                key={art.id}
                onClick={() => setArtigoModal(art)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-400 transition cursor-pointer flex flex-col justify-between group"
              >
                {/* Ilustração ou Foto Editorial Fiel */}
                <BlogIllustration artigo={art} />

                {/* Conteúdo do Card */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-slate-700">
                        {art.tag}
                      </span>
                      <span>{art.data} · {art.tempo}</span>
                    </div>

                    <h4 className="text-lg font-serif font-black text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {art.titulo}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {art.resumo}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-blue-600">
                    <span>Ler artigo</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. BANNER PRO NO RODAPÉ DO BLOG (Idêntico ao print 3) */}
        <div className="bg-white rounded-2xl border-2 border-blue-900/10 p-6 sm:p-9 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800 tracking-wider uppercase">
                Lottery Pro
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] tracking-wider uppercase">
                PRO
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Acesso vitalício
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
              Seus bilhetes juntos. Os resultados também.
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Guarde quantos jogos precisar, acompanhe a conferência e consulte seu histórico. O Pro também libera filtros, fechamentos e a organização dos bolões.
            </p>
          </div>

          <div className="text-left lg:text-right space-y-2 shrink-0">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              R$ 119,90
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pagamento único. Sem mensalidade.
            </div>

            <button
              type="button"
              onClick={onOpenPro}
              className="w-full sm:w-auto px-7 py-3 bg-[#1e3a8a] hover:bg-[#172554] text-white font-extrabold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Conhecer o Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-slate-400 font-medium pt-0.5">
              7 dias para experimentar e pedir reembolso.
            </div>
          </div>
        </div>

      </div>

      {/* 7. MODAL DE LEITURA COMPLETA DO ARTIGO */}
      {artigoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl border border-stone-200 space-y-6 my-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#d97706]">
                {artigoModal.tag}
              </span>
              <button
                onClick={() => setArtigoModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-600 flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 leading-tight">
                {artigoModal.titulo}
              </h2>
              <div className="text-xs text-slate-400 font-medium">
                {artigoModal.data} · {artigoModal.tempo} de leitura
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium divide-y divide-stone-100">
              {artigoModal.conteudoCompleto.map((paragrafo, idx) => (
                <p key={idx} className="pt-3 first:pt-0">
                  {paragrafo}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-medium">
                Lottery Pro — Educação e Matemática Lotérica
              </div>
              <button
                type="button"
                onClick={() => setArtigoModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
