import React, { useState } from 'react';
import { usePlantas } from '../../hooks/usePlantas.js';
import PlantaForm from '../../components/PlantaForm/index.jsx';
import PlantaList from '../../components/PlantaList/index.jsx';
import style from './style.module.css';

/**
 * Página principal para gerenciar plantas
 * Integra o formulário e a lista de plantas
 */
const PlantaManager = () => {
  const {
    plantas,
    loading,
    error,
    createPlanta,
    updatePlanta,
    deletePlanta,
    searchPlantas,
    clearFilters
  } = usePlantas();

  const [showForm, setShowForm] = useState(false);
  const [editingPlanta, setEditingPlanta] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Handlers para o formulário
  const handleCreatePlanta = async (plantaData) => {
    try {
      await createPlanta(plantaData);
      setShowForm(false);
      alert('Planta cadastrada com sucesso!');
    } catch (error) {
      alert(`Erro ao cadastrar planta: ${error.message}`);
    }
  };

  const handleUpdatePlanta = async (plantaData) => {
    try {
      await updatePlanta(editingPlanta.id, plantaData);
      setEditingPlanta(null);
      setShowForm(false);
      alert('Planta atualizada com sucesso!');
    } catch (error) {
      alert(`Erro ao atualizar planta: ${error.message}`);
    }
  };

  const handleEditPlanta = (planta) => {
    setEditingPlanta(planta);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingPlanta(null);
    setShowForm(false);
  };

  // Handlers para a lista
  const handleDeletePlanta = (planta) => {
    setShowDeleteConfirm(planta);
  };

  const confirmDelete = async () => {
    if (showDeleteConfirm) {
      try {
        await deletePlanta(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
        alert('Planta excluída com sucesso!');
      } catch (error) {
        alert(`Erro ao excluir planta: ${error.message}`);
      }
    }
  };

  const handleSearch = async (filters) => {
    try {
      await searchPlantas(filters);
    } catch (error) {
      alert(`Erro na busca: ${error.message}`);
    }
  };

  const handleViewPlanta = (planta) => {
    // Implementar visualização de detalhes se necessário
    console.log('Visualizar planta:', planta);
    alert(`Visualizando planta: ${planta.identificacao?.codigo_individual}`);
  };

  const handleNewPlanta = () => {
    setEditingPlanta(null);
    setShowForm(true);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>Gerenciador de Plantas</h1>
        <div className={style.headerActions}>
          <button
            onClick={handleNewPlanta}
            className={style.newButton}
            disabled={loading}
          >
            + Nova Planta
          </button>
        </div>
      </div>

      {error && (
        <div className={style.errorMessage}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Formulário modal/overlay */}
      {showForm && (
        <div className={style.formOverlay}>
          <div className={style.formContainer}>
            <PlantaForm
              initialData={editingPlanta}
              onSubmit={editingPlanta ? handleUpdatePlanta : handleCreatePlanta}
              onCancel={handleCancelEdit}
              loading={loading}
              title={editingPlanta ? 'Editar Planta' : 'Cadastrar Nova Planta'}
            />
          </div>
        </div>
      )}

      {/* Lista de plantas */}
      <PlantaList
        plantas={plantas}
        loading={loading}
        onEdit={handleEditPlanta}
        onDelete={handleDeletePlanta}
        onView={handleViewPlanta}
        onSearch={handleSearch}
      />

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h3 className={style.modalTitle}>Confirmar Exclusão</h3>
            <p className={style.modalMessage}>
              Tem certeza que deseja excluir a planta{' '}
              <strong>{showDeleteConfirm.identificacao?.codigo_individual}</strong>?
              <br />
              Esta ação não pode ser desfeita.
            </p>
            <div className={style.modalActions}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className={style.cancelButton}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className={style.confirmButton}
                disabled={loading}
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantaManager;
