import { create } from "zustand";

interface CurrentCountProps {
    currentCount: number
    setCurrentCount: (value: number) => void
}

export const useCurrentCount = create<CurrentCountProps>(set => ({
    currentCount: {} as number,
    setCurrentCount: (value: number) => set({ currentCount: value })
}))