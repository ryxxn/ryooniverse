import React from 'react';
import { useGuestbooks } from '../../../../shared/apis/guestbook/get';
import GuestbookItem from './guestbook-item';
import AddGuestbookButton from './add-guestbook-button';

const Guestbooks = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGuestbooks();

  const isNotData = !isLoading && !data?.pages[0]?.data?.length;

  return (
    <section className="flex flex-col flex-1 bg-white p-4 rounded-lg shadow-lg mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold mb-2">방명록</h2>
        <AddGuestbookButton />
      </div>

      {isNotData && (
        <p className="mt-4 text-center">등록된 방명록이 없습니다.</p>
      )}

      {isFetched &&
        data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.data?.map((guestbook) => (
              <GuestbookItem key={guestbook.id} item={guestbook} />
            ))}
          </React.Fragment>
        ))}
      {hasNextPage && (
        <button
          className="flex items-center mt-4 mb-2 text-sm text-gray-700"
          onClick={() => fetchNextPage()}
        >
          <div className="w-8 h-px bg-divider" />
          <span className="ml-4">
            {isFetchingNextPage ? '불러오는 중..' : '더보기'}
          </span>
        </button>
      )}
    </section>
  );
};

export default Guestbooks;
