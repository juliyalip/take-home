import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { useStoreCards } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {

  const listQuery = useGetListData();

  const [isDeletedCardsOpen, setIsDeletedCardsOpen] = useState<boolean>(false)
  const { visibleCards, setVisibleCards, deletedCards } = useStoreCards()
  const deletedCount = deletedCards.length
  const isDisable = deletedCount <= 0

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    if (visibleCards.length === 0) {

      const initialCards = listQuery.data
        ?.filter((item) => item.isVisible)
        .map((item) => ({
          ...item,
          isOpenDescription: false,
          isDeleted: false,
        })) ?? [];

      setVisibleCards(initialCards);
    }
  }, [listQuery.data, listQuery.isLoading, visibleCards.length]);

  useEffect(() => {
    if (listQuery.isSuccess && listQuery.data) {
      const initialCards = listQuery.data
        ?.filter((item) => item.isVisible)
        .map((item) => ({
          ...item,
          isOpenDescription: false,
          isDeleted: false,
        })) ?? [];
        setVisibleCards(initialCards);
    }
  }, [listQuery.data, listQuery.isSuccess, setVisibleCards]);

  if (listQuery.isError) {
    console.error(listQuery.error);
    return <div>Error: Unknown error</div>;
  }

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const handleRefresh = () => {
    console.log('click')
    listQuery.refetch()
  };

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        <div className="flex flex-col gap-y-3" style={{ width: '400px' }}>
          {visibleCards.map((card) => (
            <Card key={card.id} title={card.title} id={card.id} description={card.description} isOpenDescription={card.isOpenDescription} />
          ))}
        </div>
        {visibleCards.length > 0 && <button
          onClick={handleRefresh}
          className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1 mt-4"
        >
          Load more
        </button>}

      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between" style={{ width: '400px' }}>
          <h1 className="mb-1 font-medium text-lg">Deleted Cards {deletedCount}</h1>
          <button onClick={() => setIsDeletedCardsOpen(!isDeletedCardsOpen)}
            disabled={isDisable}
            className={`text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 ml-10 ${isDisable ? "cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            {isDeletedCardsOpen ? "Close" : "Reveal"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {isDeletedCardsOpen && deletedCards.length > 0 &&
            deletedCards.map((card) => (
              <Card
                key={card.id}
              {...card}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};


