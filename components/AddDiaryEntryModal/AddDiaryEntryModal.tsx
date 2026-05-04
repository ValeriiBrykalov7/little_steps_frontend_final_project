'use client';

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import css from './AddDiaryEntryModal.module.css';

type ModalProps = {
  onClose: () => void;
  title?: string;
  children?: ReactNode | ((props: { close: () => void }) => ReactNode);
};

const MODAL_ANIMATION_MS = 220;

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export const AddDiaryEntryModal = ({
  onClose,
  title = 'Новий запис',
  children,
}: ModalProps) => {
  const isClient = useIsClient();
  const [isClosing, setIsClosing] = useState(false);

  const closeWithAnimation = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    if (!isClosing) return;

    const timerId = setTimeout(onClose, MODAL_ANIMATION_MS);

    return () => clearTimeout(timerId);
  }, [isClosing, onClose]);

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

  const modalRoot = document.querySelector('#modal-root') || document.body;

  return createPortal(
    <div
      className={`${css.backdrop} ${isClosing ? css.backdropClosing : ''}`}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className={`${css.TaskModal} ${isClosing ? css.modalClosing : ''}`}>
        <button
          type='button'
          className={css.btnboxclose}
          onClick={closeWithAnimation}
        >
          <svg className={css.closebtn} width='32' height='32'>
            <use href='/sprite.svg#icon-close'></use>
          </svg>
        </button>
        <p className={css.textfortask}>{title}</p>
        {typeof children === 'function'
          ? children({ close: closeWithAnimation })
          : children}
      </div>
    </div>,
    modalRoot,
  );
};
