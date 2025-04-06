import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalDefaultProps, ModalProps } from './types';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';

const modalRoot = document.getElementById('modal-root')!;

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8, // 초기 크기를 80%로 설정 (작게 시작)
  },
  visible: {
    opacity: 1,
    scale: 1, // 100% 크기로 변환 (점점 커지면서 나타남)
    transition: { duration: 0.2, type: 'spring', damping: 25, stiffness: 500 },
  },
  exit: {
    opacity: 0,
    scale: 0.8, // 다시 작아지면서 사라짐
    transition: { duration: 0.2 },
  },
};

const Modal = ({
  isOpen,
  onClose,
  children,
  className = '',
  closeOnBackdropClick = true,
}: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose(); // 배경 클릭 시 모달 닫기
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#00000090] flex justify-center items-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={cn(
              'bg-white rounded-lg shadow-lg overflow-hidden',
              className
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

const ModalHeader = ({
  children,
  className = '',
  ...other
}: ModalDefaultProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-b border-gray-300',
        className
      )}
      {...other}
    >
      {children}
    </div>
  );
};

const ModalBody = ({
  children,
  className = '',
  ...other
}: ModalDefaultProps) => {
  return (
    <div className={cn('p-4', className)} {...other}>
      {children}
    </div>
  );
};

const ModalFooter = ({
  children,
  className = '',
  ...other
}: ModalDefaultProps) => {
  return (
    <div
      className={cn('flex justify-end p-4 border-t border-gray-300', className)}
      {...other}
    >
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
