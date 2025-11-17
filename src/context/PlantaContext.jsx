import React, { createContext, useContext, useState, useCallback } from 'react';

const PlantaContext = createContext();

export function PlantaProvider({ children }) {
  const [plantaData, setPlantaData] = useState({
    // Dados da primeira tela
    imagens: [],
    codigo_individual: '',
    especie: '',
    
    // Dados da segunda tela
    tipo_muda: '',
    altura_metros: '',
    diametro_copa_metros: '',
    diametro_tronco_metros: '',
    data_plantio: '',
    idade_arvore: '',
    lote: '',
    localizacao: '',
    
    // Dados da terceira tela
    situacao: 'saudavel',
    doenca: '',
    tratamento: '',
    adubo: '',
    data_adubacao: '',
    data_ultima_inspecao: '',
    nao_foi_adubado: false,
    observacoes: '',
    
    // Dados da quarta tela
    qr_code: null,
    ultima_colheita_peso: '',
    data_ultima_colheita: ''
  });

  const updatePlantaData = useCallback((newData) => {
    console.log('[PlantaContext] Atualizando dados com:', newData);
    setPlantaData(prev => {
      const updated = {
        ...prev,
        ...newData
      };
      console.log('[PlantaContext] Estado após update:', updated);
      return updated;
    });
  }, []);

  const resetPlantaData = useCallback(() => {
    console.log('[PlantaContext] Resetando dados para novo cadastro');
    setPlantaData({
      imagens: [],
      codigo_individual: '',
      especie: '',
      tipo_muda: '',
      altura_metros: '',
      diametro_copa_metros: '',
      diametro_tronco_metros: '',
      data_plantio: '',
      idade_arvore: '',
      lote: '',
      localizacao: '',
      situacao: 'saudavel',
      doenca: '',
      tratamento: '',
      adubo: '',
      data_adubacao: '',
      data_ultima_inspecao: '',
      nao_foi_adubado: false,
      observacoes: '',
      qr_code: null,
      ultima_colheita_peso: '',
      data_ultima_colheita: ''
    });
  }, []);

  return (
    <PlantaContext.Provider value={{ plantaData, updatePlantaData, resetPlantaData }}>
      {children}
    </PlantaContext.Provider>
  );
}

export function usePlantaContext() {
  const context = useContext(PlantaContext);
  if (!context) {
    throw new Error('usePlantaContext deve ser usado dentro de um PlantaProvider');
  }
  return context;
}