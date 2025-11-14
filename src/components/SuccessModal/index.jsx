import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import style from './style.module.css';

export default function SuccessModal({ message = 'Cadastro realizado com sucesso!', onClose, autoCloseDuration = 3000 }) {
  useEffect(() => {
    if (autoCloseDuration && onClose) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [autoCloseDuration, onClose]);

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.checkmark}>
          <Check size={64} strokeWidth={3} />
        </div>
        <p className={style.message}>{message}</p>
        {onClose && (
          <button className={style.closeBtn} onClick={onClose}>
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}
