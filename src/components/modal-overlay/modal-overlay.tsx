import styles from './modal-overlay.module.css';

type IModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay = ({ onClose }: IModalOverlayProps) => {
  return <div className={styles.modal_overlay} onClick={onClose} />;
};
