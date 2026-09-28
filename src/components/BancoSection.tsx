import React, { useState } from 'react';
import { Upload, Database, Search, FileSpreadsheet } from 'lucide-react';

interface Concurso {
  n: number;
  d: number[];
  date?: string;
}

interface BancoProps {
  concursos: Concurso[];
  onImportar: (novos: Concurso[]) => void;
}

export const BancoSection: React.FC<BancoProps> = ({ concursos, onImportar }) => {
  const [search, setSearch] = useState('');
  const [pagina, setPagina] = useState(1);
  const porPagina = 50;

  const filtrados = concursos.filter((c) =>
    String(c.n).includes(search.trim()) || (c.date && c.date.includes(search.trim()))
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const atualPagina = Math.min(pagina, totalPaginas);
  const startIdx = (atualPagina - 1) * porPagina;
  const listaExibida = filtrados.slice(startIdx, startIdx + porPagina);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        // Parser simples de CSV/TXT se fornecido
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        const parsed: Concurso[] = [];
        lines.forEach((line, idx) => {
          const nums = Array.from(new Set(line.match(/\d+/g)?.map(Number).filter((n) => n >= 1 && n <= 25) || []));
          if (nums.length === 15) {
            parsed.push({
              n: idx + 1,
              d: nums.sort((a, b) => a - b),
              date: new Date().toLocaleDateString('pt-BR')
            });
          }
        });

        if (parsed.length > 0) {
          onImportar(parsed);
          alert(`Foram importados com sucesso ${parsed.length} concursos!`);
        } else {
          alert('Arquivo importado. Para importar Lotofácil.xlsx utilize a versão Desktop ou cole o arquivo.');
        }
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Upload e Ações */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <span>Banco de Dados Histórico ({concursos.length} Concursos)</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Histórico completo sincronizado com as estatísticas e conferências.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition flex items-center gap-2 cursor-pointer shadow-sm">
          <Upload className="w-4 h-4" />
          <span>Importar Arquivo (.xlsx/.csv)</span>
          <input type="file" accept=".xlsx,.csv,.txt" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Tabela de Concursos */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagina(1);
              }}
              placeholder="Buscar concurso (ex: 3790)..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:border-blue-600"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Página {atualPagina} de {totalPaginas}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                <th className="py-3 px-4">Concurso</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Dezenas Sorteadas</th>
                <th className="py-3 px-4 text-center">Soma</th>
                <th className="py-3 px-4 text-center">Par/Ímpar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {listaExibida.map((c) => {
                const soma = c.d.reduce((a, b) => a + b, 0);
                const pares = c.d.filter((n) => n % 2 === 0).length;
                return (
                  <tr key={c.n} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 px-4 font-black text-indigo-700">#{c.n}</td>
                    <td className="py-2.5 px-4 text-slate-500">{c.date || '—'}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {c.d.map((num) => (
                          <span
                            key={num}
                            className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center justify-center border border-slate-200"
                          >
                            {String(num).padStart(2, '0')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold text-slate-700">{soma}</td>
                    <td className="py-2.5 px-4 text-center text-slate-500">
                      {pares}P / {15 - pares}I
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-2">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={atualPagina === 1}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold disabled:opacity-30"
            >
              Anterior
            </button>
            <span className="text-xs font-semibold text-slate-600">
              {atualPagina} / {totalPaginas}
            </span>
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={atualPagina === totalPaginas}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold disabled:opacity-30"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
