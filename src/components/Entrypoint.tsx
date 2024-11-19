import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { useStoreCards } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {

  const [isDeletedCardsOpen, setIsDeletedCardsOpen] = useState<boolean>(false)
 
  const listQuery = useGetListData();
  const {visibleCards, setVisibleCards, deletedCards} = useStoreCards()
  const deletedCount = deletedCards.length

  const isDisable = deletedCount <=0
  
  // TOOD
  // const deletedCards: DeletedListItem[] = [];

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

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        <div className="flex flex-col gap-y-3" style={{width: '400px'}}>
          {visibleCards.map((card) => (
            <Card key={card.id} title={card.title} id={card.id} description={card.description} isOpenDescription={card.isOpenDescription} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards {deletedCount}</h1>
          <button onClick={() => setIsDeletedCardsOpen(!isDeletedCardsOpen)}
            disabled={isDisable}
            className={`text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 ml-10 ${
              isDisable ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Reveal
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
        {isDeletedCardsOpen && deletedCards.length > 0 && 
    deletedCards.map((card) => (
      <Card 
        key={card.id} 
        title={card.title} 
        id={card.id} 
        description={card.description} 
        isOpenDescription={card.isOpenDescription} 
      />
    ))
  }
        </div>
      </div>
    </div>
  );
};


//   <Card key={card.id} card={card} />