import { FC } from "react"
import { useStoreCards } from "../store";
import { CardItem } from "../store";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";

type CardProps = {
  id: CardItem['id'],
  title: CardItem ["title"];
  description: CardItem ["description"];
  isOpenDescription: CardItem["isOpenDescription"]
};

export const Card: FC<CardProps> = ({id, title, description, isOpenDescription}) => {

  const {deleteCard} = useStoreCards()
  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onAction={() =>{}}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton onAction={()=>{deleteCard(id)}} />
        </div>
      </div>
    {isOpenDescription &&  <p className="text-sm">{description}</p>}
    </div>
  );
};
