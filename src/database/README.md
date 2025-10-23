# Sistema de Persistência de Dados - Plantas

## Como Usar

### 1. Usando o Hook (Recomendado para React)

```javascript
import { usePlantas } from '../hooks/usePlantas.js';

const MeuComponente = () => {
  const {
    plantas,
    loading,
    error,
    createPlanta,
    updatePlanta,
    deletePlanta,
    searchPlantas
  } = usePlantas();

  const handleNovaPlanta = async (dados) => {
    try {
      await createPlanta(dados);
      console.log('Planta criada!');
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {plantas.map(planta => (
        <div key={planta.id}>
          {planta.identificacao.codigo_individual}
        </div>
      ))}
    </div>
  );
};
```

### 2. Usando o Service Diretamente

```javascript
import { PlantaService } from '../services/PlantaService.js';

// Criar planta
const novaPlanta = {
  identificacao: {
    codigo_individual: "QR_001",
    especie: "Cacau"
  },
  // ... outros campos
};

const id = await PlantaService.create(novaPlanta);

// Buscar todas
const plantas = await PlantaService.getAll();

// Buscar por ID
const planta = await PlantaService.getById(id);

// Atualizar
await PlantaService.update(id, { status: { situacao: "Saudável" } });

// Deletar
await PlantaService.delete(id);

// Buscar com filtros
const resultados = await PlantaService.search({
  situacao: "Saudável",
  especie: "Cacau"
});
```

### 3. Usando os Componentes

```javascript
import PlantaManager from '../pages/PlantaManager/index.jsx';

// Em seu roteador
<Route path="/plantas" element={<PlantaManager />} />
```

