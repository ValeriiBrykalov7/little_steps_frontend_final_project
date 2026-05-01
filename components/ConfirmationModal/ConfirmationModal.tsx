'use client';

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import css from './ConfirmationModal.module.css';

type Props = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

const MODAL_ANIMATION_MS = 220;

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

type ClosingAction = 'cancel' | 'confirm' | null;

export const ConfirmationModal = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: Props) => {
  const isClient = useIsClient();
  const [closingAction, setClosingAction] = useState<ClosingAction>(null);

  const closeWithAnimation = useCallback(() => {
    setClosingAction('cancel');
  }, []);

  const confirmWithAnimation = useCallback(() => {
    setClosingAction('confirm');
  }, []);

  useEffect(() => {
    if (!closingAction) return;

    const timerId = setTimeout(() => {
      if (closingAction === 'confirm') {
        void onConfirm();
        return;
      }

      onCancel();
    }, MODAL_ANIMATION_MS);

    return () => clearTimeout(timerId);
  }, [closingAction, onCancel, onConfirm]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeWithAnimation();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeWithAnimation]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeWithAnimation();
  };

  if (!isClient) return null;

  const modalRoot = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    <div
      className={`${css.backdrop} ${closingAction ? css.backdropClosing : ''}`}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div
        className={`${css.TaskModal} ${closingAction ? css.modalClosing : ''}`}
      >
        <button
          type='button'
          className={css.btnboxclose}
          onClick={closeWithAnimation}
        >
          <svg className={css.closebtn}>
            <use href='/sprite.svg#icon-close'></use>
          </svg>
        </button>

        <p className={css.textfortask}>{title}</p>

        <div className={css.actions}>
          <button type='button' className='pink' onClick={closeWithAnimation}>
            {cancelButtonText}
          </button>

          <button type='button' className='gray' onClick={confirmWithAnimation}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
