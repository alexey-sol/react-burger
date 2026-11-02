import { Button, CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect, type PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modals');

type ModalProps = PropsWithChildren<{
  title?: string;
  onClose: () => void;
}>;

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return (): void => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />

      <div className={styles.modal_content}>
        <header className={styles.modal_header}>
          {title ? (
            <h3 className={clsx(styles.modal_title, 'text text_type_main-medium')}>
              {title}
            </h3>
          ) : (
            <div />
          )}
          <Button
            className={styles.modal_close_button}
            htmlType="button"
            onClick={onClose}
            size="small"
            type="secondary"
          >
            <CloseIcon type="primary" />
          </Button>
        </header>
        <div>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
