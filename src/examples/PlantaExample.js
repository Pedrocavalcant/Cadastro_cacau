/**
 * Exemplo de uso da API de plantas
 * Este arquivo demonstra como usar o serviço de plantas e o hook usePlantas
 */

import { PlantaService } from '../services/PlantaService.js';
import { createEmptyPlanta, validatePlantaData, calcularIdadeArvore } from '../utils/plantaHelpers.js';

/**
 * Exemplo de como usar o PlantaService diretamente
 */
export const exemploUsoService = async () => {
  try {
    // Criar uma nova planta
    const novaPlanta = {
      identificacao: {
        imagens: "planta1.jpg",
        codigo_individual: "QR_CACAU_001",
        especie: "Cacau"
      },
      detalhes_plantio: {
        tipo_muda: "Muda",
        altura_metros: 2.5,
        diametro_copa_metros: 3.0,
        diametro_tronco_metros: 0.15,
        data_plantio: "2023-01-15",
        idade_arvore: "",
        lote: "LOTE_A",
        localizacao: "Setor Norte"
      },
      produtividade: {
        qr_code: "QR_CACAU_001",
        ultima_colheita_peso: 850.00,
        data_ultima_colheita: "2024-10-15"
      },
      status: {
        situacao: "Saudável",
        adubo: "NPK 20-10-10",
        data_adubacao: "2024-09-01",
        data_ultima_inspecao: "2024-10-01",
        nao_foi_adubado: false,
        observacoes: "Planta em excelente estado"
      }
    };

    // Validar dados antes de salvar
    const validation = validatePlantaData(novaPlanta);
    if (!validation.isValid) {
      console.error('Dados inválidos:', validation.errors);
      return;
    }

    // Calcular idade da árvore
    novaPlanta.detalhes_plantio.idade_arvore = calcularIdadeArvore(novaPlanta.detalhes_plantio.data_plantio);

    // Salvar no banco
    const id = await PlantaService.create(novaPlanta);
    console.log('Planta criada com ID:', id);

    // Buscar todas as plantas
    const todasPlantas = await PlantaService.getAll();
    console.log('Total de plantas:', todasPlantas.length);

    // Buscar planta específica
    const planta = await PlantaService.getById(id);
    console.log('Planta encontrada:', planta);

    // Buscar por código
    const plantaPorCodigo = await PlantaService.getByCodigo("QR_CACAU_001");
    console.log('Planta por código:', plantaPorCodigo);

    // Atualizar planta
    const dadosAtualizacao = {
      status: {
        ...planta.status,
        situacao: "Doente",
        observacoes: "Detectada praga, tratamento iniciado"
      }
    };
    
    await PlantaService.update(id, dadosAtualizacao);
    console.log('Planta atualizada');

    // Buscar com filtros
    const plantasFiltradas = await PlantaService.search({
      situacao: "Doente",
      especie: "Cacau"
    });
    console.log('Plantas doentes de cacau:', plantasFiltradas.length);

    // Contar plantas
    const total = await PlantaService.count();
    console.log('Total de plantas no banco:', total);

    return { id, todasPlantas, planta, plantasFiltradas, total };

  } catch (error) {
    console.error('Erro no exemplo:', error);
    throw error;
  }
};

/**
 * Exemplo de como usar o hook usePlantas em um componente React
 */
export const exemploUsoHook = () => {
  // Em um componente React, você usaria assim:
  /*
  import { usePlantas } from '../hooks/usePlantas.js';

  const MeuComponente = () => {
    const {
      plantas,
      loading,
      error,
      createPlanta,
      updatePlanta,
      deletePlanta,
      getPlantaById,
      getPlantaByCodigo,
      searchPlantas,
      clearFilters,
      loadPlantas
    } = usePlantas();

    const handleNovaPlanta = async () => {
      const novaPlanta = createEmptyPlanta();
      novaPlanta.identificacao.codigo_individual = "QR_TESTE_001";
      novaPlanta.identificacao.especie = "Cacau";
      novaPlanta.detalhes_plantio.data_plantio = "2024-01-01";
      novaPlanta.status.situacao = "Saudável";
      
      try {
        await createPlanta(novaPlanta);
        console.log('Planta criada com sucesso!');
      } catch (error) {
        console.error('Erro ao criar planta:', error);
      }
    };

    const handleBuscarPlantas = async () => {
      try {
        await searchPlantas({
          situacao: "Saudável",
          especie: "Cacau"
        });
      } catch (error) {
        console.error('Erro na busca:', error);
      }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
      <div>
        <h1>Minhas Plantas ({plantas.length})</h1>
        <button onClick={handleNovaPlanta}>Nova Planta</button>
        <button onClick={handleBuscarPlantas}>Buscar Plantas Saudáveis</button>
        <button onClick={clearFilters}>Limpar Filtros</button>
        
        {plantas.map(planta => (
          <div key={planta.id}>
            <h3>{planta.identificacao?.codigo_individual}</h3>
            <p>Espécie: {planta.identificacao?.especie}</p>
            <p>Situação: {planta.status?.situacao}</p>
            <button onClick={() => deletePlanta(planta.id)}>Excluir</button>
          </div>
        ))}
      </div>
    );
  };
  */
};

/**
 * Exemplo de estrutura de dados para diferentes tipos de plantas
 */
export const exemplosEstruturas = {
  // Planta de cacau saudável
  cacauSaudavel: {
    identificacao: {
      imagens: "cacau_saudavel.jpg",
      codigo_individual: "QR_CACAU_001",
      especie: "Cacau"
    },
    detalhes_plantio: {
      tipo_muda: "Muda",
      altura_metros: 3.2,
      diametro_copa_metros: 4.5,
      diametro_tronco_metros: 0.25,
      data_plantio: "2022-03-15",
      idade_arvore: "2 anos e 7 meses",
      lote: "LOTE_A",
      localizacao: "Setor Norte - Quadra 1"
    },
    produtividade: {
      qr_code: "QR_CACAU_001",
      ultima_colheita_peso: 1200.50,
      data_ultima_colheita: "2024-10-15"
    },
    status: {
      situacao: "Saudável",
      adubo: "NPK 20-10-10",
      data_adubacao: "2024-09-15",
      data_ultima_inspecao: "2024-10-01",
      nao_foi_adubado: false,
      observacoes: "Planta em excelente estado, produção acima da média"
    }
  },

  // Planta doente
  plantaDoente: {
    identificacao: {
      imagens: "planta_doente.jpg",
      codigo_individual: "QR_CACAU_002",
      especie: "Cacau"
    },
    detalhes_plantio: {
      tipo_muda: "Semente",
      altura_metros: 1.8,
      diametro_copa_metros: 2.1,
      diametro_tronco_metros: 0.12,
      data_plantio: "2023-06-20",
      idade_arvore: "1 ano e 4 meses",
      lote: "LOTE_B",
      localizacao: "Setor Sul - Quadra 3"
    },
    produtividade: {
      qr_code: "QR_CACAU_002",
      ultima_colheita_peso: 0,
      data_ultima_colheita: ""
    },
    status: {
      situacao: "Doente",
      adubo: "",
      data_adubacao: "",
      data_ultima_inspecao: "2024-10-01",
      nao_foi_adubado: true,
      observacoes: "Detectada vassoura-de-bruxa, tratamento com fungicida iniciado"
    }
  },

  // Planta de cupuaçu
  cupuacu: {
    identificacao: {
      imagens: "cupuacu.jpg",
      codigo_individual: "QR_CUPUACU_001",
      especie: "Cupuaçu"
    },
    detalhes_plantio: {
      tipo_muda: "Muda",
      altura_metros: 2.8,
      diametro_copa_metros: 3.5,
      diametro_tronco_metros: 0.18,
      data_plantio: "2021-11-10",
      idade_arvore: "3 anos",
      lote: "LOTE_C",
      localizacao: "Setor Leste - Quadra 2"
    },
    produtividade: {
      qr_code: "QR_CUPUACU_001",
      ultima_colheita_peso: 450.75,
      data_ultima_colheita: "2024-09-20"
    },
    status: {
      situacao: "Saudável",
      adubo: "Composto orgânico",
      data_adubacao: "2024-08-30",
      data_ultima_inspecao: "2024-09-25",
      nao_foi_adubado: false,
      observacoes: "Planta adaptada ao clima local, boa resistência"
    }
  }
};

/**
 * Função para popular o banco com dados de exemplo
 */
export const popularBancoExemplo = async () => {
  try {
    console.log('Populando banco com dados de exemplo...');
    
    // Limpar banco existente
    await PlantaService.clear();
    
    // Criar plantas de exemplo
    const exemplos = Object.values(exemplosEstruturas);
    const ids = [];
    
    for (const exemplo of exemplos) {
      const id = await PlantaService.create(exemplo);
      ids.push(id);
      console.log(`Planta criada com ID: ${id}`);
    }
    
    console.log(`Banco populado com ${ids.length} plantas de exemplo`);
    return ids;
    
  } catch (error) {
    console.error('Erro ao popular banco:', error);
    throw error;
  }
};

/**
 * Função para testar todas as funcionalidades
 */
export const testarTodasFuncionalidades = async () => {
  try {
    console.log('=== TESTE COMPLETO DA API DE PLANTAS ===');
    
    // 1. Popular banco com exemplos
    await popularBancoExemplo();
    
    // 2. Testar busca
    const todasPlantas = await PlantaService.getAll();
    console.log('1. Total de plantas:', todasPlantas.length);
    
    // 3. Testar busca por filtros
    const plantasSaudaveis = await PlantaService.search({ situacao: "Saudável" });
    console.log('2. Plantas saudáveis:', plantasSaudaveis.length);
    
    // 4. Testar busca por espécie
    const plantasCacau = await PlantaService.search({ especie: "Cacau" });
    console.log('3. Plantas de cacau:', plantasCacau.length);
    
    // 5. Testar atualização
    if (plantasCacau.length > 0) {
      const primeiraPlanta = plantasCacau[0];
      await PlantaService.update(primeiraPlanta.id, {
        status: {
          ...primeiraPlanta.status,
          observacoes: "Teste de atualização realizado com sucesso!"
        }
      });
      console.log('4. Planta atualizada com sucesso');
    }
    
    // 6. Testar contagem
    const total = await PlantaService.count();
    console.log('5. Total final de plantas:', total);
    
    console.log('=== TESTE CONCLUÍDO COM SUCESSO ===');
    return true;
    
  } catch (error) {
    console.error('=== ERRO NO TESTE ===', error);
    return false;
  }
};
