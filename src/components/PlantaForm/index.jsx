import React, { useState, useEffect } from 'react';
import { createEmptyPlanta, validatePlantaData, calcularIdadeArvore, gerarCodigoQR } from '../../utils/plantaHelpers.js';
import style from './style.module.css';

/**
 * Componente de formulário para cadastro/edição de plantas
 */
const PlantaForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel, 
  loading = false,
  title = "Cadastrar Planta"
}) => {
  const [formData, setFormData] = useState(createEmptyPlanta());
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carregar dados iniciais se fornecidos
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Atualizar idade da árvore quando data de plantio mudar
  useEffect(() => {
    if (formData.detalhes_plantio?.data_plantio) {
      const idade = calcularIdadeArvore(formData.detalhes_plantio.data_plantio);
      setFormData(prev => ({
        ...prev,
        detalhes_plantio: {
          ...prev.detalhes_plantio,
          idade_arvore: idade
        }
      }));
    }
  }, [formData.detalhes_plantio?.data_plantio]);

  // Gerar código QR quando espécie ou localização mudarem
  useEffect(() => {
    if (formData.identificacao?.especie && formData.detalhes_plantio?.localizacao) {
      const codigoQR = gerarCodigoQR(
        formData.identificacao.especie,
        formData.detalhes_plantio.localizacao
      );
      setFormData(prev => ({
        ...prev,
        produtividade: {
          ...prev.produtividade,
          qr_code: codigoQR
        }
      }));
    }
  }, [formData.identificacao?.especie, formData.detalhes_plantio?.localizacao]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validar dados
      const validation = validatePlantaData(formData);
      if (!validation.isValid) {
        setErrors(validation.errors.reduce((acc, error) => {
          // Mapear erros para campos específicos se necessário
          acc.general = error;
          return acc;
        }, {}));
        return;
      }

      // Chamar função de submit
      await onSubmit(formData);
      
      // Limpar formulário se não for edição
      if (!initialData) {
        setFormData(createEmptyPlanta());
      }
      
      setErrors({});
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setFormData(createEmptyPlanta());
      setErrors({});
    }
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.title}>{title}</h2>
      
      {errors.general && (
        <div className={style.errorMessage}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        {/* Seção Identificação */}
        <fieldset className={style.fieldset}>
          <legend className={style.legend}>Identificação</legend>
          
          <div className={style.formGroup}>
            <label className={style.label}>
              Código Individual *
            </label>
            <input
              type="text"
              value={formData.identificacao?.codigo_individual || ''}
              onChange={(e) => handleInputChange('identificacao', 'codigo_individual', e.target.value)}
              className={style.input}
              placeholder="Ex: QR_CODE_001"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.label}>
              Espécie *
            </label>
            <select
              value={formData.identificacao?.especie || ''}
              onChange={(e) => handleInputChange('identificacao', 'especie', e.target.value)}
              className={style.select}
              required
            >
              <option value="">Selecione a espécie</option>
              <option value="Cacau">Cacau</option>
              <option value="Cupuaçu">Cupuaçu</option>
              <option value="Açaí">Açaí</option>
              <option value="Outra">Outra</option>
            </select>
          </div>

          <div className={style.formGroup}>
            <label className={style.label}>
              Imagens
            </label>
            <input
              type="text"
              value={formData.identificacao?.imagens || ''}
              onChange={(e) => handleInputChange('identificacao', 'imagens', e.target.value)}
              className={style.input}
              placeholder="URL ou nome do arquivo de imagem"
            />
          </div>
        </fieldset>

        {/* Seção Detalhes do Plantio */}
        <fieldset className={style.fieldset}>
          <legend className={style.legend}>Detalhes do Plantio</legend>
          
          <div className={style.formGroup}>
            <label className={style.label}>
              Tipo de Muda
            </label>
            <select
              value={formData.detalhes_plantio?.tipo_muda || ''}
              onChange={(e) => handleInputChange('detalhes_plantio', 'tipo_muda', e.target.value)}
              className={style.select}
            >
              <option value="">Selecione o tipo</option>
              <option value="Semente">Semente</option>
              <option value="Muda">Muda</option>
              <option value="Estaca">Estaca</option>
            </select>
          </div>

          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label className={style.label}>
                Altura (metros)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.detalhes_plantio?.altura_metros || ''}
                onChange={(e) => handleInputChange('detalhes_plantio', 'altura_metros', parseFloat(e.target.value) || null)}
                className={style.input}
                placeholder="0.0"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>
                Diâmetro Copa (metros)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.detalhes_plantio?.diametro_copa_metros || ''}
                onChange={(e) => handleInputChange('detalhes_plantio', 'diametro_copa_metros', parseFloat(e.target.value) || null)}
                className={style.input}
                placeholder="0.0"
              />
            </div>
          </div>

          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label className={style.label}>
                Diâmetro Tronco (metros)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.detalhes_plantio?.diametro_tronco_metros || ''}
                onChange={(e) => handleInputChange('detalhes_plantio', 'diametro_tronco_metros', parseFloat(e.target.value) || null)}
                className={style.input}
                placeholder="0.00"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>
                Data de Plantio *
              </label>
              <input
                type="date"
                value={formData.detalhes_plantio?.data_plantio || ''}
                onChange={(e) => handleInputChange('detalhes_plantio', 'data_plantio', e.target.value)}
                className={style.input}
                required
              />
            </div>
          </div>

          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label className={style.label}>
                Lote
              </label>
              <input
                type="text"
                value={formData.detalhes_plantio?.lote || ''}
                onChange={(e) => handleInputChange('detalhes_plantio', 'lote', e.target.value)}
                className={style.input}
                placeholder="Número do lote"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>
                Localização
              </label>
              <input
                type="text"
                value={formData.detalhes_plantio?.localizacao || ''}
                onChange={(e) => handleInputChange('detalhes_plantio', 'localizacao', e.target.value)}
                className={style.input}
                placeholder="Localização da planta"
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label className={style.label}>
              Idade da Árvore (calculada automaticamente)
            </label>
            <input
              type="text"
              value={formData.detalhes_plantio?.idade_arvore || ''}
              className={`${style.input} ${style.readonly}`}
              readOnly
              placeholder="Será calculada automaticamente"
            />
          </div>
        </fieldset>

        {/* Seção Produtividade */}
        <fieldset className={style.fieldset}>
          <legend className={style.legend}>Produtividade</legend>
          
          <div className={style.formGroup}>
            <label className={style.label}>
              QR Code (gerado automaticamente)
            </label>
            <input
              type="text"
              value={formData.produtividade?.qr_code || ''}
              className={`${style.input} ${style.readonly}`}
              readOnly
              placeholder="Será gerado automaticamente"
            />
          </div>

          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label className={style.label}>
                Última Colheita - Peso (kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.produtividade?.ultima_colheita_peso || ''}
                onChange={(e) => handleInputChange('produtividade', 'ultima_colheita_peso', parseFloat(e.target.value) || null)}
                className={style.input}
                placeholder="0.00"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>
                Data da Última Colheita
              </label>
              <input
                type="date"
                value={formData.produtividade?.data_ultima_colheita || ''}
                onChange={(e) => handleInputChange('produtividade', 'data_ultima_colheita', e.target.value)}
                className={style.input}
              />
            </div>
          </div>
        </fieldset>

        {/* Seção Status */}
        <fieldset className={style.fieldset}>
          <legend className={style.legend}>Status</legend>
          
          <div className={style.formGroup}>
            <label className={style.label}>
              Situação *
            </label>
            <select
              value={formData.status?.situacao || ''}
              onChange={(e) => handleInputChange('status', 'situacao', e.target.value)}
              className={style.select}
              required
            >
              <option value="">Selecione a situação</option>
              <option value="Saudável">Saudável</option>
              <option value="Doente">Doente</option>
              <option value="Pragas">Pragas</option>
              <option value="Morto">Morto</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={style.formGroup}>
            <label className={style.label}>
              Adubo
            </label>
            <input
              type="text"
              value={formData.status?.adubo || ''}
              onChange={(e) => handleInputChange('status', 'adubo', e.target.value)}
              className={style.input}
              placeholder="Tipo de adubo utilizado"
            />
          </div>

          <div className={style.formRow}>
            <div className={style.formGroup}>
              <label className={style.label}>
                Data da Adubação
              </label>
              <input
                type="date"
                value={formData.status?.data_adubacao || ''}
                onChange={(e) => handleInputChange('status', 'data_adubacao', e.target.value)}
                className={style.input}
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>
                Data da Última Inspeção
              </label>
              <input
                type="date"
                value={formData.status?.data_ultima_inspecao || ''}
                onChange={(e) => handleInputChange('status', 'data_ultima_inspecao', e.target.value)}
                className={style.input}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label className={style.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.status?.nao_foi_adubado || false}
                onChange={(e) => handleInputChange('status', 'nao_foi_adubado', e.target.checked)}
                className={style.checkbox}
              />
              Não foi adubado
            </label>
          </div>

          <div className={style.formGroup}>
            <label className={style.label}>
              Observações
            </label>
            <textarea
              value={formData.status?.observacoes || ''}
              onChange={(e) => handleInputChange('status', 'observacoes', e.target.value)}
              className={style.textarea}
              placeholder="Observações adicionais sobre a planta..."
              rows="3"
            />
          </div>
        </fieldset>

        {/* Botões de ação */}
        <div className={style.buttonGroup}>
          <button
            type="button"
            onClick={handleCancel}
            className={style.cancelButton}
            disabled={isSubmitting || loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={style.submitButton}
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlantaForm;
