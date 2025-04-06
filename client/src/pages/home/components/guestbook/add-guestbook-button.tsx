import React from 'react';
import { useCreateGuestbook } from '../../../../shared/apis/guestbook/create';
import useModal from '../../../../shared/components/modal/use-modal';
import Modal from '../../../../shared/components/modal/modal';
import { Square, SquareCheckBig } from 'lucide-react';
import toast from 'react-hot-toast';

const AddGuestbookButton = () => {
  const [message, setMessage] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);

  const addMutation = useCreateGuestbook();

  const { isOpen, onOpen, onClose } = useModal();

  const onTogglePrivate = () => {
    setIsPrivate((prev) => !prev);
  };

  const onUpload = () => {
    if (!message) {
      toast.error('방명록 내용을 입력해주세요.');
      return;
    }
    if (message.length > 1000) {
      toast.error('방명록 내용은 1000자 이내로 입력해주세요.');
      return;
    }

    const payload = { message, isPrivate };
    addMutation.mutate(payload, {
      onSuccess: () => {
        setMessage('');
        setIsPrivate(false);
        onClose();
      },
    });
  };

  return (
    <>
      <button type="button" onClick={onOpen}>
        등록
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Header>
          <h2 className="text-lg font-bold">방명록 등록</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col min-w-[500px]">
            <div className="flex justify-end items-center gap-2 mb-2 text-">
              {isPrivate ? (
                <SquareCheckBig
                  onClick={onTogglePrivate}
                  className="cursor-pointer"
                  size={20}
                />
              ) : (
                <Square
                  onClick={onTogglePrivate}
                  className="cursor-pointer"
                  size={20}
                />
              )}
              <label className="text-sm">비공개</label>
            </div>

            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded-lg p-2"
              placeholder="방명록 내용을 입력하세요."
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="gap-2">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg ml-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            onClick={onUpload}
          >
            등록
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddGuestbookButton;
