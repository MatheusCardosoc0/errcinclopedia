import { data } from "@/@types/dataType";
import { create } from "zustand";

interface CurrentErrorProps {
    currentError: data
    setCurrentError: (value: data) => void
}

export const useCurrentError = create<CurrentErrorProps>(set => ({
    currentError: {} as data,
    setCurrentError: (value: data) => set({ currentError: value })
}))