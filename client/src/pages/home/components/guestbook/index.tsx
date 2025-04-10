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
    <section className="flex flex-col flex-1 bg-white p-4 pt-0 rounded-lg shadow-lg mt-4 overflow-y-auto">
      <div className="sticky top-0 pt-4 bg-white flex items-center justify-between">
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
          className="flex items-center justify-end mt-4 mb-2 text-sm text-gray-800 font-bold hover:text-gray-600 transition-colors duration-200"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? '불러오는 중..' : '더보기'}
        </button>
      )}
    </section>
  );
};

export default Guestbooks;
