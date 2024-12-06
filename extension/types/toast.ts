import { ReactNode } from "react";

export type ToastType = {
  id: number;
  message: ReactNode;
  exiting: boolean;
  isError: boolean;
};
export type ToastContextType = (message: ReactNode) => void;
