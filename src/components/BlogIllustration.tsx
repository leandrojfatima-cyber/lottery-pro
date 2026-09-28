import React from 'react';
import { ArtigoBlog } from '../data/blogArticles';

interface BlogIllustrationProps {
  artigo: ArtigoBlog;
}

export const BlogIllustration: React.FC<BlogIllustrationProps> = ({ artigo }) => {
  // Se tem imagem real fotográfica
  if (artigo.imagemUrl) {
    return (
      <div className="w-full h-48 sm:h-52 bg-stone-100 overflow-hidden relative group-hover:scale-102 transition-transform duration-300">
        <img
          src={artigo.imagemUrl}
          alt={artigo.titulo}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // 1. Ilustração do Volante com Calendário e Bolinhas Douradas (Idêntico ao print 2)
  if (artigo.ilustracaoTipo === 'volante') {
    return (
      <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
        <div className="flex items-center gap-4">
          {/* Mini Calendário */}
          <div className="w-16 h-20 bg-white rounded-xl border border-stone-300 shadow-xs flex flex-col items-center justify-between p-2">
            <div className="w-full border-b border-stone-200 pb-1 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
            <div className="text-2xl font-serif font-black text-slate-800">
              {artigo.data.split(' ')[0]}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              SET
            </div>
          </div>

          {/* Seta indicativa */}
          <div className="text-stone-400 font-bold text-lg">→</div>

          {/* Volante de Bolinhas Douradas (Grade 4x4) */}
          <div className="p-3 bg-white rounded-xl border border-stone-300 shadow-xs grid grid-cols-4 gap-1.5">
            {Array.from({ length: 16 }).map((_, idx) => {
              const isSelected = [0, 2, 5, 7, 8, 10, 13, 15].includes(idx);
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border transition ${
                    isSelected
                      ? 'bg-[#c27818] border-[#a06212] shadow-2xs'
                      : 'bg-stone-100 border-stone-200'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 2. Ilustração de Repasse das Loterias: Saúde, Educação, Segurança (Idêntico ao print 4)
  if (artigo.ilustracaoTipo === 'dinheiro') {
    return (
      <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
        <div className="flex items-center gap-3">
          {/* Volante */}
          <div className="p-2.5 bg-white rounded-xl border border-stone-300 shadow-xs grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-blue-600/70" />
            ))}
          </div>

          <div className="flex flex-col gap-1 items-center">
            <span className="text-slate-400 text-xs font-bold">↳</span>
            <span className="text-slate-400 text-xs font-bold">→</span>
            <span className="text-slate-400 text-xs font-bold">↲</span>
          </div>

          {/* Ícones de Destino Social */}
          <div className="grid grid-cols-2 gap-2">
            <div className="w-12 h-10 bg-white rounded-lg border border-stone-300 flex flex-col items-center justify-center p-1 shadow-2xs">
              <span className="text-[10px] font-black text-rose-600">Saúde</span>
              <span className="text-[8px] text-slate-400">SUS</span>
            </div>
            <div className="w-12 h-10 bg-white rounded-lg border border-stone-300 flex flex-col items-center justify-center p-1 shadow-2xs">
              <span className="text-[10px] font-black text-blue-600">FIES</span>
              <span className="text-[8px] text-slate-400">Educação</span>
            </div>
            <div className="w-12 h-10 bg-white rounded-lg border border-stone-300 flex flex-col items-center justify-center p-1 shadow-2xs">
              <span className="text-[10px] font-black text-amber-600">Esporte</span>
              <span className="text-[8px] text-slate-400">COB</span>
            </div>
            <div className="w-12 h-10 bg-white rounded-lg border border-stone-300 flex flex-col items-center justify-center p-1 shadow-2xs">
              <span className="text-[10px] font-black text-emerald-600">Segurança</span>
              <span className="text-[8px] text-slate-400">FNSP</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Ilustração de Segurança / App Oficial Caixa
  if (artigo.ilustracaoTipo === 'seguranca') {
    return (
      <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
        <div className="flex items-center gap-4">
          <div className="w-20 h-32 bg-[#1e293b] rounded-2xl border-2 border-slate-700 shadow-md p-2 flex flex-col items-center justify-between text-white">
            <div className="w-6 h-1 bg-slate-600 rounded-full" />
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-emerald-400 shadow-sm" />
            </div>
            <div className="text-[8px] font-black uppercase tracking-wider text-slate-300">
              CAIXA
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
              ✓ Canal Oficial
            </div>
            <div className="px-2.5 py-1 rounded-md bg-white text-slate-600 border border-stone-200 text-[10px] font-bold">
              Autenticação Gov.br
            </div>
            <div className="px-2.5 py-1 rounded-md bg-white text-slate-600 border border-stone-200 text-[10px] font-bold">
              Certificado SSL
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Ilustração de Moldura e Miolo
  if (artigo.ilustracaoTipo === 'moldura') {
    return (
      <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
        <div className="p-3 bg-white rounded-xl border border-stone-300 shadow-xs space-y-1">
          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: 25 }).map((_, idx) => {
              const row = Math.floor(idx / 5);
              const col = idx % 5;
              const isMoldura = row === 0 || row === 4 || col === 0 || col === 4;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    isMoldura
                      ? 'bg-[#1b3577] text-white'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[8px] font-bold pt-1">
            <span className="text-[#1b3577]">● 16 Moldura</span>
            <span className="text-amber-700">● 9 Miolo</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Ilustração dos Números Primos
  if (artigo.ilustracaoTipo === 'primos') {
    const primos = [2, 3, 5, 7, 11, 13, 17, 19, 23];
    return (
      <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
        <div className="p-3 bg-white rounded-xl border border-stone-300 shadow-xs space-y-1">
          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
              const isPri = primos.includes(num);
              return (
                <div
                  key={num}
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    isPri
                      ? 'bg-blue-600 text-white font-black ring-1 ring-blue-400'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {num}
                </div>
              );
            })}
          </div>
          <div className="text-center text-[9px] font-black text-blue-700 pt-1">
            9 Primos: Padrão 5 a 6 em 70%
          </div>
        </div>
      </div>
    );
  }

  // 6. Ilustração dos 4 Quadrantes
  if (artigo.ilustracaoTipo === 'quadrantes') {
    return (
      <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
        <div className="p-3 bg-white rounded-xl border border-stone-300 shadow-xs grid grid-cols-2 gap-2">
          <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <span className="text-[9px] font-black text-blue-800">Q1</span>
            <div className="flex gap-1 justify-center mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <span className="text-[9px] font-black text-emerald-800">Q2</span>
            <div className="flex gap-1 justify-center mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
          </div>
          <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-center">
            <span className="text-[9px] font-black text-amber-800">Q3</span>
            <div className="flex gap-1 justify-center mt-1">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            </div>
          </div>
          <div className="p-2 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <span className="text-[9px] font-black text-purple-800">Q4</span>
            <div className="flex gap-1 justify-center mt-1">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="w-2 h-2 rounded-full bg-purple-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. Ilustração Genérica Editorial / Gráficos / Estatísticas
  return (
    <div className="w-full h-48 sm:h-52 bg-[#f4efe8] flex items-center justify-center p-6 border-b border-stone-200 overflow-hidden relative">
      <div className="flex items-center gap-3">
        <div className="w-16 h-20 bg-white rounded-xl border border-stone-300 shadow-2xs p-2 flex flex-col justify-between">
          <div className="flex gap-1 items-end h-10 border-b border-stone-200 pb-1">
            <div className="w-2 bg-blue-600 rounded-t h-4" />
            <div className="w-2 bg-blue-600 rounded-t h-8" />
            <div className="w-2 bg-amber-500 rounded-t h-6" />
            <div className="w-2 bg-emerald-500 rounded-t h-9" />
          </div>
          <div className="text-[8px] font-bold text-slate-400 text-center uppercase">
            Dados
          </div>
        </div>

        <div className="text-stone-400 font-bold text-lg">→</div>

        <div className="w-16 h-20 bg-white rounded-xl border border-stone-300 shadow-2xs p-2 flex flex-col items-center justify-center">
          <div className="text-xl font-serif font-black text-[#c27818]">
            {artigo.categoria === 'megasena' ? 'Sena' : '15'}
          </div>
          <div className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
            Acertos
          </div>
        </div>
      </div>
    </div>
  );
};
