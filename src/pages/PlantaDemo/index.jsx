import React from 'react';
import { usePlantas } from '../../hooks/usePlantas';

const PlantaDemo = () => {
  const { plantas, loading, error, createPlanta, loadPlantas } = usePlantas();

  const handleAddDemo = async () => {
    const now = new Date();
    const demoPlanta = {
      codigo_individual: `DEMO-${now.getTime()}`,
      identificacao: {
        especie: 'Cacau Demo',
        variedade: 'Forastero',
      },
      detalhes_plantio: {
        data_plantio: now.toISOString().slice(0, 10),
        local: 'Talhão Demo',
      },
      status: {
        situacao: 'Saudável',
      },
    };

    try {
      await createPlanta(demoPlanta);
    } catch (e) {
      // erro já é tratado no hook
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: '16px' }}>
      <h2 style={{ marginBottom: 16 }}>Plantas (Demo)</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={handleAddDemo}>Adicionar planta demo</button>
        <button type="button" onClick={loadPlantas}>Recarregar</button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      {!loading && !error && plantas.length === 0 && (
        <p>Nenhuma planta cadastrada. Clique em "Adicionar planta demo" para criar uma.</p>
      )}

      {!loading && !error && plantas.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Código</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Espécie</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Variedade</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Situação</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Plantio</th>
            </tr>
          </thead>
          <tbody>
            {plantas.map((p) => (
              <tr key={p.id}>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{p.id}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{p.codigo_individual || '-'}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{p.identificacao?.especie || '-'}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{p.identificacao?.variedade || '-'}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{p.status?.situacao || '-'}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{p.detalhes_plantio?.data_plantio || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlantaDemo;


