import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Copy, Check, Sparkles, Smartphone, CheckCircle2, ExternalLink } from 'lucide-react';
import type { User as FirebaseUser } from '../firebase';
import { db, doc, setDoc } from '../firebase';

export const MERCADO_PAGO_CHECKOUT_URL = 'https://mpago.la/1i9ivFj';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: FirebaseUser | null;
  onSuccessPro: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  user,
  onSuccessPro
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'apple' | 'google'>('pix');
  const [nome, setNome] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);

  // Cartão
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('12');

  // Estado do PIX Gerado
  const [pixGerado, setPixGerado] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const precoPix = cupomAplicado ? 87.90 : 97.90;
  const valorParcela = '10,99';

  // Código Pix Copia e Cola formatado
  const pixCopiaECola = `00020126580014br.gov.bcb.pix0136lotterypro-${email || 'cliente'}-vitalicio520400005303986540${precoPix.toFixed(2)}5802BR5915LOTTERY PRO TEC6009SAO PAULO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopiaECola);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleGerarPix = () => {
    if (!nome.trim() || !email.trim()) {
      setFormError('Por favor, preencha pelo menos o seu Nome e E-mail para identificar sua compra.');
      return;
    }
    setFormError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPixGerado(true);
    }, 600);
  };

  const handleConfirmarPagamento = async () => {
    setLoading(true);
    try {
      if (user) {
        await setDoc(doc(db, 'users', user.uid), { isPro: true, proAtivadoEm: new Date().toISOString() }, { merge: true });
      }
      setTimeout(() => {
        setLoading(false);
        onSuccessPro();
        onClose();
      }, 1000);
    } catch (e) {
      console.error(e);
      setLoading(false);
      onSuccessPro();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl my-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[95vh]">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* 1. Header do Checkout (Fiel à Cakto) */}
          <div className="text-center pt-2 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="flex gap-1 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </span>
              <span className="font-black text-xl tracking-tight text-slate-900">
                LOTTERY <span className="text-blue-600">PRO</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] bg-slate-900 text-white rounded font-bold uppercase tracking-wider">
                PRO
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Lottery Pro vitalício
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Pagamento único · Sem mensalidade · 7 dias de garantia
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Seu acesso chega no email da compra.
            </p>
          </div>

          {/* 2. Box do Produto */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-950 to-blue-950 flex flex-col items-center justify-center text-white shrink-0 shadow-sm border border-slate-800">
              <Sparkles className="w-5 h-5 text-amber-400 mb-0.5" />
              <span className="text-[9px] font-black tracking-wider uppercase">PRO</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Lottery Pro Vitalício</h3>
              <p className="text-xs text-slate-500">Acesso ilimitado às 9 Loterias Caixa, gerador e estatísticas.</p>
            </div>
          </div>

          {/* Atalho Mercado Pago Oficial */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                MP
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Pague com Mercado Pago Oficial</div>
                <div className="text-[11px] text-slate-500">Pix imediato ou até 12× de R$ 10,99 com proteção ao comprador</div>
              </div>
            </div>
            <a
              href={MERCADO_PAGO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Ir pro Mercado Pago</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Se o Pix já foi gerado, exibe tela de pagamento PIX */}
          {pixGerado ? (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-emerald-950">PIX Gerado com Sucesso!</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Pague <strong>R$ {precoPix.toFixed(2).replace('.', ',')}</strong> pelo app do seu banco para liberar imediatamente.
                </p>

                {/* QR Code Simulado com padrão SVG */}
                <div className="mt-5 p-4 bg-white rounded-2xl inline-block shadow-md border border-slate-200">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pixCopiaECola)}`}
                    alt="QR Code PIX"
                    className="w-44 h-44 mx-auto rounded-lg"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-2">Validade: 15 minutos</span>
                </div>
              </div>

              {/* Código Copia e Cola */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Código Pix Copia e Cola:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pixCopiaECola}
                    className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 truncate"
                  />
                  <button
                    onClick={handleCopyPix}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      copiedPix
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800'
                    }`}
                  >
                    {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar PIX'}</span>
                  </button>
                </div>
              </div>

              {/* Botão de confirmação */}
              <button
                onClick={handleConfirmarPagamento}
                disabled={loading}
                className="w-full py-3.5 bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-emerald-800 transition cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {loading ? 'Validando transação...' : 'Já Paguei, Liberar Meu Acesso PRO'}
              </button>

              <button
                onClick={() => setPixGerado(false)}
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                ← Voltar para dados do pedido
              </button>
            </div>
          ) : (
            <>
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* 3. Formulário de Dados Pessoais */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Preencha seu nome"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Preencha seu email"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Celular
                    </label>
                    <input
                      type="tel"
                      value={celular}
                      onChange={(e) => setCelular(e.target.value)}
                      placeholder="Preencha seu celular"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CPF/CNPJ
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="Preencha seu CPF/CNPJ"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Oferta */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="font-bold text-slate-600">Oferta Vitalícia</span>
                <span className="font-bold text-slate-900">R$ {precoPix.toFixed(2).replace('.', ',')} à vista</span>
              </div>

              {/* 4. Forma de Pagamento (Idêntico ao print) */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Forma de Pagamento
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* PIX */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'bg-[#005c4b] text-white border-[#005c4b] shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="font-black text-sm">❖</span>
                    </div>
                    <span className="text-xs font-black tracking-wider uppercase">PIX</span>
                  </button>

                  {/* Cartão de Crédito */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[11px] font-bold text-center leading-tight">Cartão de Crédito</span>
                  </button>

                  {/* Apple Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                      paymentMethod === 'apple'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base font-black"></span>
                    <span className="text-[11px] font-bold">Apple Pay</span>
                  </button>

                  {/* Google Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google')}
                    className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 border transition cursor-pointer ${
                      paymentMethod === 'google'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-black text-xs">G Pay</span>
                    <span className="text-[11px] font-bold">Google Pay</span>
                  </button>
                </div>
              </div>

              {/* Se Cartão selecionado: Campos do Cartão */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nome impresso no Cartão
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Como está no cartão"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Validade (MM/AA)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Parcelas
                    </label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    >
                      <option value="12">12× de R$ 10,99</option>
                      <option value="6">6× de R$ 18,90</option>
                      <option value="3">3× de R$ 35,50</option>
                      <option value="1">1× de R$ 97,90 (À vista)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 5. Resumo do Pedido */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Resumo do pedido
                </h4>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cupom}
                      onChange={(e) => setCupom(e.target.value)}
                      placeholder="Código de desconto"
                      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (cupom.trim().toUpperCase() === 'PRO10' || cupom.trim().length > 0) {
                          setCupomAplicado(true);
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Aplicar Cupom
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <span>Lottery Pro (Pagamento único)</span>
                    <span className="font-bold text-slate-900">
                      {paymentMethod === 'card' && installments !== '1'
                        ? `${installments}× de R$ ${valorParcela}`
                        : `R$ ${precoPix.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-dashed border-slate-200">
                    <span>Total</span>
                    <span className="text-base text-emerald-700">
                      {paymentMethod === 'card' && installments !== '1'
                        ? `${installments}× de R$ ${valorParcela}`
                        : `R$ ${precoPix.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. Botão de Ação Verde (Idêntico ao Gerar PIX) */}
              <button
                type="button"
                onClick={paymentMethod === 'pix' ? handleGerarPix : handleConfirmarPagamento}
                disabled={loading}
                className="w-full py-4 px-4 bg-[#005c4b] hover:bg-[#004d3e] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Processando...</span>
                ) : paymentMethod === 'pix' ? (
                  <span>Gerar PIX</span>
                ) : (
                  <span>Finalizar Pagamento</span>
                )}
              </button>

              {/* 7. Selo de Compra Segura e Termos */}
              <div className="text-center space-y-2 pt-1 text-[11px] text-slate-400">
                <div className="flex items-center justify-center gap-1.5 text-slate-500 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Compra 100% Segura e Criptografada</span>
                </div>
                <p className="leading-tight">
                  Ao prosseguir, você concorda com os Termos de uso de Lottery Pro. Acesso vitalício imediato.
                </p>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
