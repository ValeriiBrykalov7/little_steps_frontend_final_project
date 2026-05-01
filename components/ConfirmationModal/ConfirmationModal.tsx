//app/components/Sidebar/ConfirmationModal.tsx
'use client';

import { useEffect, useSyncExternalStore, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import css from './ConfirmationModal.module.css';

type Props = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export const ConfirmationModal = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: Props) => {
  const isClient = useIsClient();

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

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onCancel();
  };

  if (!isClient) return null;

  const modalRoot = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    <div
      className={css.backdrop}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className={css.TaskModal}>
        <button type='button' className={css.btnboxclose} onClick={onCancel}>
          <svg className={css.closebtn}>
            <use href='/sprite.svg#icon-close'></use>
          </svg>
        </button>

        <p className={css.textfortask}>{title}</p>

        <div className={css.actions}>
          <button type='button' className='pink' onClick={onCancel}>
            {cancelButtonText}
          </button>

          <button type='button' className='gray' onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
