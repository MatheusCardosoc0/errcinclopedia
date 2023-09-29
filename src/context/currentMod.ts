import { create } from "zustand";

type values = "POST" | "PUT" | "NONE"

interface CurrentModProps {
    currentMod: values
    setCurrentMod: (value: values) => void
}

export const useCurrentMod = create<CurrentModProps>(set => ({
    currentMod: "NONE",
    setCurrentMod: (value: values) => set({ currentMod: value })
}))