import { create } from "zustand";

interface AnimeSelectStore {
	page: number;
	selectedOption: string;
	setPage: (page: number) => void;
	setSelectedOption: (option: string) => void;
}

export const useAnimeSelectStore = create<AnimeSelectStore>((set) => ({
	page: 1,
	selectedOption: "top",
	setPage: (page: number): void => {
		set({ page });
	},
	setSelectedOption: (option: string): void => {
		set({ selectedOption: option });
	},
}));
