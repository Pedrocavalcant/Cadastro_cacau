import React, { useState } from 'react';
import { formatPlantaForDisplay } from '../../utils/plantaHelpers.js';
import style from './style.module.css';

/**
 * Componente para listar plantas com funcionalidades de busca e filtros
 */
const PlantaList = ({ 
  plantas = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onView,
  onSearch 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSituacao, setFilterSituacao] = useState('');
  const [filterEspecie, setFilterEspecie] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filtrar e ordenar plantas
  const filteredPlantas = plantas
    .filter(planta => {
      const formattedPlanta = formatPlantaForDisplay(planta);
      
      // Filtro por termo de busca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          formattedPlanta.identificacao?.codigo_individual?.toLowerCase().includes(searchLower) ||
          formattedPlanta.identificacao?.especie?.toLowerCase().includes(searchLower) ||
          formattedPlanta.detalhes_plantio?.localizacao?.toLowerCase().includes(searchLower) ||
          formattedPlanta.status?.observacoes?.toLowerCase().includes(searchLower)
        );
      }
      
      // Filtro por situação
      if (filterSituacao) {
        return formattedPlanta.status?.situacao === filterSituacao;
      }
      
      // Filtro por espécie
      if (filterEspecie) {
        return formattedPlanta.identificacao?.especie === filterEspecie;
      }
      
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'codigo_individual':
          aValue = a.identificacao?.codigo_individual || '';
          bValue = b.identificacao?.codigo_individual || '';
          break;
        case 'especie':
          aValue = a.identificacao?.especie || '';
          bValue = b.identificacao?.especie || '';
          break;
        case 'data_plantio':
          aValue = new Date(a.detalhes_plantio?.data_plantio || 0);
          bValue = new Date(b.detalhes_plantio?.data_plantio || 0);
          break;
        case 'situacao':
          aValue = a.status?.situacao || '';
          bValue = b.status?.situacao || '';
          break;
        default:
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        searchTerm,
        situacao: filterSituacao,
        especie: filterEspecie
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterSituacao('');
    setFilterEspecie('');
    if (onSearch) {
      onSearch({});
    }
  };

  const getSituacaoColor = (situacao) => {
    switch (situacao?.toLowerCase()) {
      case 'saudável':
        return '#27ae60';
      case 'doente':
        return '#e74c3c';
      case 'pragas':
        return '#f39c12';
      case 'morto':
        return '#7f8c8d';
      default:
        return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinner}></div>
        <p>Carregando plantas...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Lista de Plantas</h2>
        <p className={style.count}>
          {filteredPlantas.length} de {plantas.length} plantas
        </p>
      </div>

      {/* Filtros e busca */}
      <div className={style.filters}>
        <form onSubmit={handleSearch} className={style.searchForm}>
          <div className={style.searchGroup}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, espécie, localização..."
              className={style.searchInput}
            />
            <button type="submit" className={style.searchButton}>
              Buscar
            </button>
          </div>
        </form>

        <div className={style.filterGroup}>
          <select
            value={filterSituacao}
            onChange={(e) => setFilterSituacao(e.target.value)}
            className={style.filterSelect}
          >
            <option value="">Todas as situações</option>
            <option value="Saudável">Saudável</option>
            <option value="Doente">Doente</option>
            <option value="Pragas">Pragas</option>
            <option value="Morto">Morto</option>
            <option value="Outro">Outro</option>
          </select>

          <select
            value={filterEspecie}
            onChange={(e) => setFilterEspecie(e.target.value)}
            className={style.filterSelect}
          >
            <option value="">Todas as espécies</option>
            <option value="Cacau">Cacau</option>
            <option value="Cupuaçu">Cupuaçu</option>
            <option value="Açaí">Açaí</option>
            <option value="Outra">Outra</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className={style.filterSelect}
          >
            <option value="createdAt-desc">Mais recentes</option>
            <option value="createdAt-asc">Mais antigas</option>
            <option value="codigo_individual-asc">Código (A-Z)</option>
            <option value="codigo_individual-desc">Código (Z-A)</option>
            <option value="especie-asc">Espécie (A-Z)</option>
            <option value="especie-desc">Espécie (Z-A)</option>
            <option value="data_plantio-desc">Plantio (mais recente)</option>
            <option value="data_plantio-asc">Plantio (mais antigo)</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className={style.clearButton}
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Lista de plantas */}
      {filteredPlantas.length === 0 ? (
        <div className={style.emptyState}>
          <p>Nenhuma planta encontrada.</p>
          {plantas.length === 0 && (
            <p>Comece adicionando sua primeira planta!</p>
          )}
        </div>
      ) : (
        <div className={style.plantsGrid}>
          {filteredPlantas.map((planta) => {
            const formattedPlanta = formatPlantaForDisplay(planta);
            return (
              <div key={planta.id} className={style.plantCard}>
                <div className={style.cardHeader}>
                  <h3 className={style.plantCode}>
                    {formattedPlanta.identificacao?.codigo_individual || 'Sem código'}
                  </h3>
                  <span
                    className={style.situacao}
                    style={{ 
                      backgroundColor: getSituacaoColor(formattedPlanta.status?.situacao),
                      color: 'white'
                    }}
                  >
                    {formattedPlanta.status?.situacao || 'Não informado'}
                  </span>
                </div>

                <div className={style.cardBody}>
                  <div className={style.plantInfo}>
                    <div className={style.infoItem}>
                      <strong>Espécie:</strong> {formattedPlanta.identificacao?.especie || 'Não informado'}
                    </div>
                    <div className={style.infoItem}>
                      <strong>Data de Plantio:</strong> {formatDate(formattedPlanta.detalhes_plantio?.data_plantio)}
                    </div>
                    <div className={style.infoItem}>
                      <strong>Idade:</strong> {formattedPlanta.detalhes_plantio?.idade_arvore || 'Não calculada'}
                    </div>
                    <div className={style.infoItem}>
                      <strong>Localização:</strong> {formattedPlanta.detalhes_plantio?.localizacao || 'Não informado'}
                    </div>
                    {formattedPlanta.produtividade?.ultima_colheita_peso && (
                      <div className={style.infoItem}>
                        <strong>Última Colheita:</strong> {formattedPlanta.produtividade.ultima_colheita_peso}kg
                      </div>
                    )}
                  </div>

                  {formattedPlanta.status?.observacoes && (
                    <div className={style.observacoes}>
                      <strong>Observações:</strong> {formattedPlanta.status.observacoes}
                    </div>
                  )}
                </div>

                <div className={style.cardActions}>
                  {onView && (
                    <button
                      onClick={() => onView(planta)}
                      className={style.actionButton}
                      title="Ver detalhes"
                    >
                      👁️
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(planta)}
                      className={style.actionButton}
                      title="Editar"
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(planta)}
                      className={`${style.actionButton} ${style.deleteButton}`}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlantaList;
