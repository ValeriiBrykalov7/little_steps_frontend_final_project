//app/components/Sidebar/ConfirmationModal.tsx
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './ConfirmationModal.module.css';

type Props = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationModal = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: Props) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onCancel();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className={css.TaskModal}>
        <button type='button' className={css.btnboxclose} onClick={onCancel}>
          <svg className={css.closebtn} width='32' height='32'>
            <use href='/sprite.svg#icon-close'></use>
          </svg>
        </button>

        <p className={css.textfortask}>{title}</p>

        <div className={css.actions}>
          <button className='pink' onClick={onCancel}>
            {cancelButtonText}
          </button>

          <button className='gray' onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
