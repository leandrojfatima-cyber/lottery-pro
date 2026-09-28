import React, { useState, useEffect } from 'react';
import { DezeneiroHeader, AppTab } from './components/DezeneiroHeader';
import { DezeneiroHero } from './components/DezeneiroHero';
import { HomeSection } from './components/HomeSection';
import { FerramentasSection } from './components/FerramentasSection';
import { BlogSection } from './components/BlogSection';
import { ConferirSection } from './components/ConferirSection';
import { EstatisticasSection } from './components/EstatisticasSection';
import { GeradorSection } from './components/GeradorSection';
import { BancoSection } from './components/BancoSection';
import { AuthModal } from './components/AuthModal';
import { ProModal } from './components/ProModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { auth, onAuthStateChanged, User } from './firebase';
import { LOTTERIES } from './data/lotteriesConfig';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [showProSuccessToast, setShowProSuccessToast] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  const [activeTab, setActiveTab] = useState<AppTab>('resultado');
  const [selectedLotteryId, setSelectedLotteryId] = useState<string>('lotofacil');

  const currentLottery = LOTTERIES[selectedLotteryId] || LOTTERIES.lotofacil;

  // Monitora autenticação com Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header com seletor de todas as 9 loterias */}
      <DezeneiroHeader
        user={user}
        selectedLottery={selectedLotteryId}
        onSelectLottery={(id) => {
          setSelectedLotteryId(id);
          handleTabChange('resultado');
        }}
        onOpenAuth={handleOpenAuth}
        onOpenPro={() => setProModalOpen(true)}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />

      {/* 2. Seções Alternáveis (Sobem para o topo imediatamente ao trocar de aba) */}
      <main className="pb-28 md:pb-16">
        {activeTab === 'home' && (
          <HomeSection
            onSelectLottery={(id) => {
              setSelectedLotteryId(id);
            }}
            onNavigateTab={(tab) => handleTabChange(tab)}
            onOpenPro={() => setProModalOpen(true)}
          />
        )}

        {activeTab === 'ferramentas' && (
          <FerramentasSection
            onSelectLottery={(id) => {
              setSelectedLotteryId(id);
            }}
            onNavigateTab={(tab) => handleTabChange(tab)}
            onOpenPro={() => setProModalOpen(true)}
          />
        )}

        {activeTab === 'blog' && (
          <BlogSection
            onNavigateTab={(tab) => handleTabChange(tab)}
            onSelectLottery={(id) => {
              setSelectedLotteryId(id);
            }}
            onOpenPro={() => setProModalOpen(true)}
          />
        )}

        {activeTab === 'resultado' && (
          <>
            <DezeneiroHero
              lottery={currentLottery}
              onConferirClick={() => handleTabChange('conferir')}
              onGerarClick={() => handleTabChange('gerador')}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Ferramentas da {currentLottery.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div
                  onClick={() => handleTabChange('conferir')}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-3">
                    🎯
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">Conferidor Automático</h3>
                  <p className="text-xs text-slate-500">
                    Cadastre seus jogos da {currentLottery.name} e veja os pontos calculados ao vivo.
                  </p>
                </div>

                <div
                  onClick={() => handleTabChange('gerador')}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-3">
                    ⚡
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">Gerador & Fechamento</h3>
                  <p className="text-xs text-slate-500">
                    Gere combinações e desdobramentos inteligentes para a {currentLottery.name}.
                  </p>
                </div>

                <div
                  onClick={() => handleTabChange('estatisticas')}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-3">
                    📊
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">Estatísticas & Tendências</h3>
                  <p className="text-xs text-slate-500">
                    Top mais sorteadas, dezenas mais atrasadas e mapa de calor completo.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'conferir' && (
          <ConferirSection
            user={user}
            lottery={currentLottery}
            onOpenAuth={() => handleOpenAuth('register')}
          />
        )}

        {activeTab === 'estatisticas' && (
          <EstatisticasSection lottery={currentLottery} />
        )}

        {activeTab === 'gerador' && (
          <GeradorSection
            lottery={currentLottery}
            onEnviarParaConferir={() => {
              setActiveTab('conferir');
            }}
            onOpenPro={() => setProModalOpen(true)}
          />
        )}

        {activeTab === 'banco' && (
          <BancoSection
            concursos={currentLottery.sampleHistory}
            onImportar={(novos) => {
              // Importação com feedback seguro
            }}
          />
        )}
      </main>

      {/* 4. Modal de Autenticação */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* 5. Modal Conhecer Pro */}
      <ProModal
        isOpen={proModalOpen}
        onClose={() => setProModalOpen(false)}
        user={user}
        onOpenAuth={() => {
          setProModalOpen(false);
          handleOpenAuth('register');
        }}
        onOpenCheckout={() => {
          setProModalOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      {/* 6. Checkout Modal Oficial (Estilo Cakto) */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        user={user}
        onSuccessPro={() => {
          setShowProSuccessToast(true);
          setTimeout(() => setShowProSuccessToast(false), 7000);
        }}
      />

      {/* Toast de Comemoração PRO */}
      {showProSuccessToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 bg-emerald-900 text-white rounded-2xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-2xl">🎉</span>
          <div>
            <div className="text-sm font-black">Pagamento Aprovado com Sucesso!</div>
            <div className="text-xs text-emerald-200">Seu plano LOTTERY PRO Vitalício foi ativado e liberado.</div>
          </div>
        </div>
      )}

      {/* 7. Barra Inferior de Navegação Mobile (Fixa no celular) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        user={user}
        onOpenAuth={handleOpenAuth}
      />
    </div>
  );
}
