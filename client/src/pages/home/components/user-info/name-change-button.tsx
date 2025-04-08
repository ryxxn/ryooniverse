import React from 'react';
import Modal from '../../../../shared/components/modal/modal';
import useModal from '../../../../shared/components/modal/use-modal';
import { useUpdateUser } from '../../../../shared/apis/users/update';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '../../../../shared/apis/query-key-factory';

const NameChangeButton = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const [username, setUsername] = React.useState('');

  const queryClient = useQueryClient();
  const updateMutation = useUpdateUser();

  const onSubmit = () => {
    if (!username) {
      toast.error('변경할 이름을 입력해주세요.');
      return;
    }
    if (username.length > 10) {
      toast.error('이름은 10자 이내로 입력해주세요.');
      return;
    }

    updateMutation.mutate(
      { username },
      {
        onSuccess: () => {
          queryClient.setQueryData(queryKeyFactory.users.me, (oldData: any) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              username,
            };
          });
          toast.success('이름이 변경되었습니다.');

          setUsername('');
          onClose();
        },
      }
    );
  };

  return (
    <>
      <button type="button" className="underline" onClick={onOpen}>
        이름 변경
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Header>
          <h2 className="text-lg font-bold">이름 변경</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col min-w-[500px]">
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="변경할 이름을 입력하세요."
              value={username}
              max={10}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex justify-end items-center gap-2 mb-2 text-gray-500">
              <span className="text-sm">최대 10자까지 입력 가능합니다.</span>
            </div>
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
            onClick={onSubmit}
          >
            변경하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NameChangeButton;
