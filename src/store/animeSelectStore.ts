import { create } from "zustand";

interface AnimeSelectStore {
	selectedOption: string;
	setSelectedOption: (option: string) => void;
}

export const useAnimeSelectStore = create<AnimeSelectStore>((set) => ({
	selectedOption: "top",
	setSelectedOption: (option: string): void => {
		set({ selectedOption: option });
	},
}));
