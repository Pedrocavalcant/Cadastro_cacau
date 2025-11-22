import React, { createContext, useContext, useState, useCallback } from 'react';

const FuncionarioContext = createContext();

export function FuncionarioProvider({ children }) {
  const [funcionarioData, setFuncionarioData] = useState({
    // Dados da primeira tela
    codigo: '', // Código gerado na primeira tela (ex: FU-123456)
    nome: '',
    usuario: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    
    // Dados da segunda tela
    cpf: '',
    celular: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
    },
    fazenda_id: null
  });

  const updateFuncionarioData = useCallback((newData) => {
    setFuncionarioData(prev => {
      // Se newData contém endereco, mescla corretamente
      if (newData.endereco) {
        return {
          ...prev,
          ...newData,
          endereco: { ...prev.endereco, ...newData.endereco }
        };
      }
      return {
        ...prev,
        ...newData
      };
    });
  }, []);

  const clearFuncionarioData = useCallback(() => {
    setFuncionarioData({
      codigo: '',
      nome: '',
      usuario: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      cpf: '',
      celular: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: ''
      },
      fazenda_id: null
    });
  }, []);

  return (
    <FuncionarioContext.Provider value={{ funcionarioData, updateFuncionarioData, clearFuncionarioData }}>
      {children}
    </FuncionarioContext.Provider>
  );
}

export function useFuncionarioContext() {
  const context = useContext(FuncionarioContext);
  if (!context) {
    throw new Error('useFuncionarioContext deve ser usado dentro de um FuncionarioProvider');
  }
  return context;
}
