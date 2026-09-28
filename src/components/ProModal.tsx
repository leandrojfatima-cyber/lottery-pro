import React from 'react';
import { X, Sparkles, Zap, Bell, Database, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import type { User as FirebaseUser } from '../firebase';

export const MERCADO_PAGO_CHECKOUT_URL = 'https://mpago.la/1i9ivFj';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: FirebaseUser | null;
  onOpenAuth: () => void;
  onOpenCheckout: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenAuth,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white text-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Topo com gradiente escuro */}
        <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acesso Pro Vitalício</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            Eleve suas chances com o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              LOTTERY PRO
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-2">
            Pagamento único · Sem mensalidade · 7 dias de garantia · Mercado Pago Oficial
          </p>
        </div>

        {/* Corpo com Benefícios */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  Fechamentos Matemáticos Otimizados
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Feche de 15 a 20 dezenas com garantia de 14 pontos economizando centenas de reais na lotérica.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  Sincronização em Nuvem Ilimitada
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Seus bilhetes salvos com segurança no Firebase Firestore, acessíveis de qualquer computador ou celular.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  Alertas em Tempo Real
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Notificações instantâneas assim que a Caixa apurar os sorteios das 9 loterias oficiais.
                </p>
              </div>
            </div>
          </div>

          {/* Destaque da Oferta com Mercado Pago */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Valor Promocional à Vista:
                </span>
                <div className="text-2xl font-black text-emerald-900">
                  R$ 97,90 <span className="text-xs font-bold text-emerald-700">no Pix</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  ou até <strong>12× de R$ 10,99</strong> no Cartão de Crédito
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                  VITALÍCIO
                </span>
                <div className="text-[10px] font-bold text-blue-700 mt-1 flex items-center justify-end gap-1">
                  <span>Mercado Pago</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com botão de ação direcionando para o Mercado Pago */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs uppercase hover:bg-slate-100 transition cursor-pointer"
          >
            Fechar
          </button>

          <a
            href={MERCADO_PAGO_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setTimeout(() => onClose(), 1000);
            }}
            className="flex-1 py-3.5 px-4 rounded-xl bg-[#005c4b] hover:bg-[#004d3e] text-white font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Pagar R$ 97,90 no Mercado Pago</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
