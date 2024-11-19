import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { useStoreCards } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
 
  const listQuery = useGetListData();
  const {visibleCards, setVisibleCards, deletedCards, setDeletedCards} = useStoreCards()

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

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        <div className="flex flex-col gap-y-3" style={{width: '400px'}}>
          {visibleCards.map((card) => (
            <Card key={card.id} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards (0)</h1>
          <button
            disabled
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Reveal
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
