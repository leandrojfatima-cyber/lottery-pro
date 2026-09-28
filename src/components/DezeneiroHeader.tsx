import React, { useState } from 'react';
import {
  Bell, User, LogOut, ChevronDown, Sparkles, Layers, Check, Volume2, Shield,
  Search, ArrowRight, Zap, Target, BarChart3, HelpCircle, CheckCircle2, History,
  TrendingUp, Dices, Award, Calendar, ExternalLink
} from 'lucide-react';
import { auth, signOut } from '../firebase';
import type { User as FirebaseUser } from '../firebase';
import { LOTTERIES } from '../data/lotteriesConfig';

export type AppTab = 'home' | 'resultado' | 'estatisticas' | 'conferir' | 'gerador' | 'banco' | 'ferramentas' | 'blog';

interface HeaderProps {
  user: FirebaseUser | null;
  selectedLottery: string;
  onSelectLottery: (id: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenPro: () => void;
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const DezeneiroHeader: React.FC<HeaderProps> = ({
  user,
  selectedLottery,
  onSelectLottery,
  onOpenAuth,
  onOpenPro,
  activeTab,
  onSelectTab
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [alertasAtivos, setAlertasAtivos] = useState(true);
  const [unreadCount, setUnreadCount] = useState(2);
  const [tudoMenuOpen, setTudoMenuOpen] = useState(false);
  const [proMenuOpen, setProMenuOpen] = useState(false);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'Resultado Lotofácil #3790',
      desc: '15 dezenas apuradas. Prêmio de R$ 2.000.000 acumulado.',
      time: 'Há 2 horas',
      unread: true
    },
    {
      id: 2,
      title: 'Mega-Sena acumulou em R$ 52 Mi!',
      desc: 'Concurso #2781 corre nesta terça-feira às 20h.',
      time: 'Ontem',
      unread: true
    },
    {
      id: 3,
      title: 'Desdobramento Matemático Ativo',
      desc: 'Sua conta PRO possui garantia de fechamento liberada.',
      time: '2 dias atrás',
      unread: false
    }
  ];

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  const currentLotteryName = LOTTERIES[selectedLottery]?.name || 'LOTOFÁCIL';

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* 1. Barra Superior Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Marca (Ao clicar vai para a Home) */}
        <div className="flex items-center gap-7">
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
            title="Ir para a página inicial da Lottery Pro"
          >
            <span className="flex gap-1 items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </span>
            <span className="font-black text-2xl tracking-tighter text-slate-900 group-hover:text-blue-600 transition">
              LOTTERY <span className="text-blue-600">PRO</span>
            </span>
          </div>

          <nav className="flex items-center gap-2 text-xs font-black tracking-wider uppercase">
            <button
              onClick={() => onSelectTab('ferramentas')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'ferramentas'
                  ? 'bg-slate-100 text-slate-900 border border-slate-300/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Ferramentas
            </button>
            <button
              onClick={() => onSelectTab('blog')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-slate-100 text-slate-900 border border-slate-300/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Blog
            </button>
          </nav>
        </div>

        {/* Lado Direito: Pro, Notificação e Autenticação */}
        <div className="flex items-center gap-3 relative">
          {/* Botão Conhecer Pro */}
          <button
            onClick={onOpenPro}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition cursor-pointer active:scale-95 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Conhecer Pro →</span>
          </button>

          {/* Botão de Notificações com Dropdown Popover */}
          <div className="relative">
            <button
              title="Notificações"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition cursor-pointer relative ${
                notificationsOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Painel Popover de Notificações */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">Notificações</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {unreadCount} novas
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="p-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-semibold text-slate-700">Alertas de Sorteio</span>
                  </div>
                  <button
                    onClick={() => setAlertasAtivos(!alertasAtivos)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      alertasAtivos ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        alertasAtivos ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3 ${
                        item.unread ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Autenticação */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <span className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">
                  Pro Ativo
                </span>
              </div>
              <button
                onClick={() => signOut(auth)}
                title="Sair da Conta"
                className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
              >
                Entrar
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition cursor-pointer shadow-xs active:scale-95"
              >
                Criar conta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Barra de Seleção de Loterias Oficiais Caixa */}
      <div className="border-t border-slate-100 px-4 sm:px-6 bg-slate-50/30 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-2 min-w-max">
          {Object.entries(LOTTERIES).map(([id, lottery]) => {
            const isSelected = selectedLottery === id;
            return (
              <button
                key={id}
                onClick={() => onSelectLottery(id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-sm ring-1 ring-slate-200 text-slate-900 scale-102'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${lottery.badgeColor}`} />
                <span>{lottery.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Submenu da Loteria Selecionada (Exibido apenas em páginas de loteria específica) */}
      {!['home', 'ferramentas', 'blog'].includes(activeTab) && (
        <div className="border-t border-slate-200/80 px-4 sm:px-6 bg-slate-50/50 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-bold tracking-wider">
          {/* Abas Principais */}
          <div className="flex items-center gap-6 overflow-x-auto py-3">
            <button
              onClick={() => {
                setTudoMenuOpen(false);
                setProMenuOpen(false);
                onSelectTab('resultado');
              }}
              className={`pb-1 uppercase transition cursor-pointer border-b-2 ${
                activeTab === 'resultado'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Resultado
            </button>
            <button
              onClick={() => {
                setTudoMenuOpen(false);
                setProMenuOpen(false);
                onSelectTab('estatisticas');
              }}
              className={`pb-1 uppercase transition cursor-pointer border-b-2 ${
                activeTab === 'estatisticas'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Estatísticas
            </button>
            <button
              onClick={() => {
                setTudoMenuOpen(false);
                setProMenuOpen(false);
                onSelectTab('conferir');
              }}
              className={`pb-1 uppercase transition cursor-pointer border-b-2 ${
                activeTab === 'conferir'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Conferir
            </button>
            <button
              onClick={() => {
                setTudoMenuOpen(false);
                setProMenuOpen(false);
                onSelectTab('gerador');
              }}
              className={`pb-1 uppercase transition cursor-pointer border-b-2 ${
                activeTab === 'gerador'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Gerador
            </button>
            <button
              onClick={() => {
                setTudoMenuOpen(false);
                setProMenuOpen(false);
                onSelectTab('banco');
              }}
              className={`pb-1 uppercase transition cursor-pointer border-b-2 ${
                activeTab === 'banco'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Histórico
            </button>
          </div>

          {/* Botões da Direita: Tudo da Loteria & Ferramentas Pro com Dropdowns Oficiais */}
          <div className="flex items-center gap-3 relative py-2">
            {/* Botão: TUDO DA LOTERIA ⌵ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setTudoMenuOpen(!tudoMenuOpen);
                  setProMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer text-xs font-bold ${
                  tudoMenuOpen
                    ? 'border-slate-400 bg-slate-100 text-slate-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                <span>TUDO DA {currentLotteryName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${tudoMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown: TUDO DA LOTERIA (Fiel à Imagem 4) */}
              {tudoMenuOpen && (
                <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-[340px] sm:w-[650px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 p-5 space-y-5">
                  {/* Topo: Título e Busca */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <h3 className="text-base font-black text-slate-900">
                      Tudo da {currentLotteryName}
                    </h3>
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="O que você procura?"
                        value={menuSearchQuery}
                        onChange={(e) => setMenuSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600 transition"
                      />
                    </div>
                  </div>

                  {/* 3 Colunas: O Sorteio / Os Números / Jogar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Coluna 1: O SORTEIO */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        O Sorteio
                      </span>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            onSelectTab('resultado');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Resultado</div>
                          <div className="text-[11px] text-slate-400">Dezenas do último concurso</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('banco');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Histórico</div>
                          <div className="text-[11px] text-slate-400">Todos os concursos já sorteados</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('resultado');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Ganhadores</div>
                          <div className="text-[11px] text-slate-400">Cidades e faixas premiadas</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('resultado');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Próximo sorteio</div>
                          <div className="text-[11px] text-slate-400">Data, hora e prêmio estimado</div>
                        </button>
                      </div>
                    </div>

                    {/* Coluna 2: OS NÚMEROS */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Os Números
                      </span>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            onSelectTab('estatisticas');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Estatísticas</div>
                          <div className="text-[11px] text-slate-400">Mais sorteadas, atrasadas, mapa de calor</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('estatisticas');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Probabilidade</div>
                          <div className="text-[11px] text-slate-400">Chance real de cada faixa</div>
                        </button>
                      </div>
                    </div>

                    {/* Coluna 3: JOGAR */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Jogar
                      </span>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            onSelectTab('conferir');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Conferir</div>
                          <div className="text-[11px] text-slate-400">Marque e confira em segundos</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('gerador');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Gerador</div>
                          <div className="text-[11px] text-slate-400">Monta jogos com filtro estatístico</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('conferir');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Relatório</div>
                          <div className="text-[11px] text-slate-400">Diagnóstico da sua cartela</div>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('gerador');
                            setTudoMenuOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Simulador</div>
                          <div className="text-[11px] text-slate-400">Custo, chance e retorno médio</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Faixa Inferior: Ferramentas PRO */}
                  <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-black text-amber-900 uppercase">Ferramentas Pro</span>
                    </div>
                    <button
                      onClick={() => {
                        setTudoMenuOpen(false);
                        onOpenPro();
                      }}
                      className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>O que vem no Pro</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botão: FERRAMENTAS PRO ⌵ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProMenuOpen(!proMenuOpen);
                  setTudoMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer text-xs font-bold ${
                  proMenuOpen
                    ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
                    : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>FERRAMENTAS PRO</span>
                <ChevronDown className={`w-3.5 h-3.5 text-amber-600 transition-transform ${proMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown: FERRAMENTAS PRO (Fiel à Imagem 5) */}
              {proMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[600px] bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 p-5 space-y-4">
                  {/* Topo do Menu Pro */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-base font-black text-slate-900">
                      Ferramentas Pro da {currentLotteryName}
                    </h3>
                    <button
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="text-xs font-black text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>O que vem no Pro</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Grid das Ferramentas Pro (2 colunas) */}
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Raio-X */}
                    <div
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/80 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">Raio-X</span>
                        <span className="px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-black uppercase">PRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Briefing completo pré-sorteio</p>
                    </div>

                    {/* Ciclo */}
                    <div
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/80 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">Ciclo</span>
                        <span className="px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-black uppercase">PRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Quais das 25 ainda faltam</p>
                    </div>

                    {/* Prêmio real */}
                    <div
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/80 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">Prêmio real</span>
                        <span className="px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-black uppercase">PRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Quanto cada faixa pagou de verdade</p>
                    </div>

                    {/* Meu jogo */}
                    <div
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/80 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">Meu jogo</span>
                        <span className="px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-black uppercase">PRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Seu jogo lido contra o histórico</p>
                    </div>

                    {/* Já saiu? */}
                    <div
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/80 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">Já saiu?</span>
                        <span className="px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-black uppercase">PRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Sua combinação já saiu no passado</p>
                    </div>

                    {/* Fechamentos */}
                    <div
                      onClick={() => {
                        setProMenuOpen(false);
                        onOpenPro();
                      }}
                      className="p-2.5 rounded-lg hover:bg-white/80 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">Fechamentos</span>
                        <span className="px-1 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-black uppercase">PRO</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Matrizes com garantia de acerto</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </header>
  );
};
