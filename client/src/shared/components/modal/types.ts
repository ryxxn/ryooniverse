export interface ModalDefaultProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ModalProps extends ModalDefaultProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
}
