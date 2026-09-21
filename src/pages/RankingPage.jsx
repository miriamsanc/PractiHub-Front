import { useState, useEffect } from 'react';
import Card from '../components/Card';
import api from '../services/api';

// Colores de medalla para los 3 primeros puestos; el resto usa un estilo neutro
const RANK_STYLES = [
  { bg: 'bg-amber-100 text-amber-700', label: '🥇 1r puesto' },
  { bg: 'bg-slate-200 text-slate-700', label: '🥈 2º puesto' },
  { bg: 'bg-amber-700/10 text-amber-800', label: '🥉 3r puesto' },
];

function getRankBadge(index) {
  return RANK_STYLES[index] || { bg: 'bg-sky-50 text-sky-hover', label: `#${index + 1}` };
}

export default function RankingPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/companies/ranking')
      .then((response) => {
        const dataList = response.data.data || response.data;
        setCompanies(Array.isArray(dataList) ? dataList : []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'No se ha podido obtener el ranking de empresas.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Cabecera Informativa */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-violet-primary/20 text-violet-hover mb-2">
              Transparencia total
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Ranking de empresas
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Empresas clasificadas según su porcentaje de aceptación de candidaturas.
            </p>
          </div>

          <div className="bg-sky-50 p-4 rounded-xl text-center sm:text-right shrink-0">
            <span className="block text-2xl font-extrabold text-sky-hover">
              {companies.length}
            </span>
            <span className="text-xs text-text-secondary font-medium">
              Empresas evaluadas
            </span>
          </div>
        </div>
      </Card>

      {/* Listado de Ranking */}
      {loading && (
        <p className="text-center text-text-secondary py-12">Cargando ranking de empresas...</p>
      )}

      {!loading && error && (
        <Card className="text-center py-12">
          <p className="text-state-rejected-text">{error}</p>
        </Card>
      )}

      {!loading && !error && companies.length === 0 && (
        <Card className="text-center py-12 text-text-secondary">
          Aún no hay empresas con candidaturas resueltas para mostrar en el ranking.
        </Card>
      )}

      {!loading && !error && companies.length > 0 && (
        <div className="space-y-3">
          {companies.map((company, index) => {
            const badge = getRankBadge(index);
            const totalProcessed = company.total_resolved ?? (company.accepted_count || 0) + (company.rejected_count || 0);

            return (
              <Card
                key={company.id ?? index}
                className={index === 0 ? 'border-amber-200 ring-1 ring-amber-100' : ''}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Información de la Empresa */}
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${badge.bg}`}>
                      {badge.label}
                    </span>

                    <div>
                      <h2 className="text-base font-bold text-text-primary">
                        {company.name}
                      </h2>
                      <span className="text-xs text-text-muted">
                        {totalProcessed} {totalProcessed === 1 ? 'candidatura procesada' : 'candidaturas procesadas'}
                      </span>
                    </div>
                  </div>

                  {/* Desglose de Métricas y Porcentaje */}
                  <div className="flex items-center gap-6 self-end md:self-auto w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border">

                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-state-accepted-bg text-state-accepted-text font-bold">
                        ✓ {company.accepted_count} aceptadas
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-state-rejected-bg text-state-rejected-text font-bold">
                        ✕ {company.rejected_count} rechazadas
                      </span>
                    </div>

                    <div className="text-right min-w-[120px]">
                      <span className="text-lg font-extrabold text-text-primary">
                        {company.acceptance_rate}%
                      </span>
                      <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden mt-1 ml-auto">
                        <div
                          className="h-full bg-gradient-to-r from-sky-primary to-state-accepted-text rounded-full"
                          style={{ width: `${Math.min(company.acceptance_rate, 100)}%` }}
                        />
                      </div>
                    </div>

                  </div>

                </div>
              </Card>
            );
          })}
        </div>
      )}

    </div>
  );
}
