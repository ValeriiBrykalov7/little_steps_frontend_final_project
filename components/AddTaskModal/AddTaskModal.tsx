'use client';
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import css from './AddTaskModal.module.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const useIsClient = () => useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
);

export const AddTaskModal = ({ onClose, children }: ModalProps) => {
    const isClient = useIsClient();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isClient) return null;

    const modalRoot = document.querySelector('#modal-root') || document.body;

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.TaskModal}>
                <button className={css.btnboxclose} onClick={onClose}>
                    <svg className={css.closebtn} width="32" height="32">
                        <use href="/sprite.svg#icon-close"></use>
                    </svg>
                </button>
                <p className={css.textfortask}>Новий запис</p>
                {children}
            </div>
        </div>,
        modalRoot
    );
};