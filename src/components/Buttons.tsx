import { FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps<T extends (...args: any[]) => void> = Omit<
  React.ComponentProps<"button">,
  "onClick"
> & {
  onAction: T; 
};

export const ExpandButton:  FC<ButtonProps<() => void>> = ({ children, onAction, ...props }) => {
  return (
    <button onClick={onAction} className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<ButtonProps<() => void>> = ({ onAction,  ...props }) => {
  return (
    <button onClick={onAction} className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};
