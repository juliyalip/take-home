import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem } from "./api/getListData";

type CardItem = ListItem & {
  isOpenDescription: boolean;
  isDeleted: boolean;
};

type State = {
  visibleCards: CardItem[];
  deletedCards: CardItem[];
};

type Actions = {
  setVisibleCards: (visibleCards: CardItem[]) => void;
  setDeletedCards: (deletedCards: CardItem[]) => void;
  deleteCard: (id: CardItem["id"]) => void;
};

export const useStoreCards = create(
  persist<State & Actions>(
    (set, get) => ({
      visibleCards: [], 
      deletedCards: [],
      setVisibleCards: (visibleCards) => set({ visibleCards }),
      setDeletedCards: (deletedCards) => set({ deletedCards }),
         deleteCard: (id: CardItem["id"]) => {
        const { visibleCards, deletedCards } = get();
        const cardToDelete = visibleCards.find((card) => card.id === id);
        if (cardToDelete) {
          set({
            visibleCards: visibleCards.filter((card) => card.id !== id),
            deletedCards: [...deletedCards, { ...cardToDelete, isDeleted: true }],
          });
        }
      },
    }),
    {
      name: "cards", 
       //@ts-ignore
      partialize: (state) => ({
        visibleCards: state.visibleCards, 
        deletedCards: state.deletedCards,
      }),
    }
  )
);


