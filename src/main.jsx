import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './utils/debugDb.js' // Carrega ferramenta de debug
import Dexie from 'dexie'

// Limpar banco de dados antigo para forçar migração correta
// Isso resolve problemas com mudança de chave primária
const initializeDatabaseMigration = async () => {
  try {
    // Deleta o banco antigo (CacauDatabase) para forçar recriação com novo schema
    await Dexie.delete('CacauDatabase');
    console.log('[Main] ✅ Database antigo (CacauDatabase) deletado para migração limpa');
  } catch (e) {
    console.warn('[Main] ⚠️ Erro ao deletar database antigo (pode ser primeiro acesso):', e.message);
  }
};

// Executar antes de renderizar qualquer coisa
initializeDatabaseMigration().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}).catch(err => {
  console.error('[Main] Erro crítico na inicialização:', err);
  // Mesmo com erro, tenta renderizar
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
