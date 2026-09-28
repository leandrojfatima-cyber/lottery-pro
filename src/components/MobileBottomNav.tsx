import React from 'react';
import { Award, CheckCircle2, Sparkles, BarChart3, User as UserIcon } from 'lucide-react';
import type { User as FirebaseUser } from '../firebase';

interface MobileBottomNavProps {
  activeTab: 'resultado' | 'estatisticas' | 'conferir' | 'gerador' | 'banco';
  onSelectTab: (tab: 'resultado' | 'estatisticas' | 'conferir' | 'gerador' | 'banco') => void;
  user: FirebaseUser | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  user,
  onOpenAuth
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden pb-safe">
      <div className="flex items-center justify-around h-16 px-1">
        <button
          onClick={() => onSelectTab('resultado')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition ${
            activeTab === 'resultado' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className={`w-5 h-5 ${activeTab === 'resultado' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Sorteio</span>
        </button>

        <button
          onClick={() => onSelectTab('conferir')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition ${
            activeTab === 'conferir' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 ${activeTab === 'conferir' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Conferir</span>
        </button>

        <button
          onClick={() => onSelectTab('gerador')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition ${
            activeTab === 'gerador' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'gerador' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Gerador</span>
        </button>

        <button
          onClick={() => onSelectTab('estatisticas')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition ${
            activeTab === 'estatisticas' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className={`w-5 h-5 ${activeTab === 'estatisticas' ? 'scale-110' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Análise</span>
        </button>

        <button
          onClick={() => {
            if (user) {
              onSelectTab('conferir');
            } else {
              onOpenAuth('login');
            }
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition ${
            user ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">{user ? 'Perfil' : 'Entrar'}</span>
        </button>
      </div>
    </nav>
  );
};
