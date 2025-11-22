/**
 * Utilitário para debugar dados no banco de dados local (IndexedDB)
 * Use no console do navegador para diagnosticar problemas de busca
 */

import { db } from '../database/index.js';
import { FuncionarioService } from '../services/FuncionarioService.js';
import { FazendaService } from '../services/FazendaService.js';

export const DebugDb = {
  /**
   * Listar todos os funcionários cadastrados
   */
  async listFuncionarios() {
    try {
      const all = await db.funcionarios.toArray();
      console.log('=== FUNCIONÁRIOS NO BANCO ===');
      console.table(all);
      console.log(`Total: ${all.length}`);
      all.forEach(f => {
        const cpfLimpo = (f.cpf || '').replace(/\D/g, '');
        console.log(`- ${f.nome} | CPF: ${f.cpf} | CPF Limpo: ${cpfLimpo} | ID: ${f.id}`);
      });
      return all;
    } catch (err) {
      console.error('Erro ao listar funcionários:', err);
    }
  },

  /**
   * Listar todas as fazendas cadastradas
   */
  async listFazendas() {
    try {
      const all = await db.fazendas.toArray();
      console.log('=== FAZENDAS NO BANCO ===');
      console.table(all);
      console.log(`Total: ${all.length}`);
      all.forEach(f => {
        const cnpjLimpo = (f.cnpj || '').replace(/\D/g, '');
        console.log(`- ${f.nome} | CNPJ: ${f.cnpj} | CNPJ Limpo: ${cnpjLimpo} | ID: ${f.id}`);
      });
      return all;
    } catch (err) {
      console.error('Erro ao listar fazendas:', err);
    }
  },

  /**
   * Buscar funcionário por CPF
   */
  async searchFuncionarioByCpf(cpf) {
    try {
      console.log(`\n=== BUSCANDO FUNCIONÁRIO CPF: ${cpf} ===`);
      const result = await FuncionarioService.getByCpf(cpf);
      if (result) {
        console.log('✅ ENCONTRADO:', result);
      } else {
        console.log('❌ NÃO ENCONTRADO');
      }
      return result;
    } catch (err) {
      console.error('Erro na busca:', err);
    }
  },

  /**
   * Buscar fazenda por CNPJ
   */
  async searchFazendaByCnpj(cnpj) {
    try {
      console.log(`\n=== BUSCANDO FAZENDA CNPJ: ${cnpj} ===`);
      const result = await FazendaService.getByCnpj(cnpj);
      if (result) {
        console.log('✅ ENCONTRADA:', result);
      } else {
        console.log('❌ NÃO ENCONTRADA');
      }
      return result;
    } catch (err) {
      console.error('Erro na busca:', err);
    }
  },

  /**
   * Teste rápido: Listar tudo e tentar buscar pelo primeiro
   */
  async quickTest() {
    try {
      console.log('\n========== TESTE RÁPIDO ==========');
      
      // Lista funcionários
      const funcs = await db.funcionarios.toArray();
      if (funcs.length > 0) {
        console.log('\n📌 TESTANDO BUSCA DE FUNCIONÁRIO:');
        const primeiro = funcs[0];
        console.log(`Primeiro funcionário: ${primeiro.nome} | CPF: ${primeiro.cpf}`);
        await this.searchFuncionarioByCpf(primeiro.cpf);
      } else {
        console.log('⚠️ Nenhum funcionário cadastrado');
      }
      
      // Lista fazendas
      const fazs = await db.fazendas.toArray();
      if (fazs.length > 0) {
        console.log('\n📌 TESTANDO BUSCA DE FAZENDA:');
        const primeira = fazs[0];
        console.log(`Primeira fazenda: ${primeira.nome} | CNPJ: ${primeira.cnpj}`);
        await this.searchFazendaByCnpj(primeira.cnpj);
      } else {
        console.log('⚠️ Nenhuma fazenda cadastrada');
      }
      
      console.log('\n========== FIM DO TESTE ==========\n');
    } catch (err) {
      console.error('Erro no teste:', err);
    }
  },

  /**
   * Limpar o banco de dados completamente (use com cuidado!)
   */
  async clearDatabase() {
    try {
      console.warn('⚠️ LIMPANDO BANCO DE DADOS...');
      await db.delete();
      console.log('✅ Banco de dados limpo');
    } catch (err) {
      console.error('Erro ao limpar:', err);
    }
  },

  /**
   * Inspecionar dados brutos do banco
   */
  async inspectRaw() {
    try {
      console.log('\n=== INSPEÇÃO BRUTA ===');
      const funcionarios = await db.funcionarios.toArray();
      const fazendas = await db.fazendas.toArray();
      console.log('Funcionários (raw):', funcionarios);
      console.log('Fazendas (raw):', fazendas);
    } catch (err) {
      console.error('Erro na inspeção:', err);
    }
  }
};

// Tornar disponível no console (window.DebugDb)
if (typeof window !== 'undefined') {
  window.DebugDb = DebugDb;
  console.log('✅ DebugDb disponível no console. Use: window.DebugDb.listFuncionarios() ou window.DebugDb.quickTest()');
}

export default DebugDb;
