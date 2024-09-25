import type { AllAnimeAPIResponse, AnimeDetailsAPIResponse } from "./types";

export async function retrieveTopAnime(
	page?: number
): Promise<AllAnimeAPIResponse> {
	const url = page
		? `https://api.jikan.moe/v4/top/anime?page=${page}`
		: "https://api.jikan.moe/v4/top/anime";
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<AllAnimeAPIResponse>;
}

export async function retrieveAiringAnime(
	page?: number
): Promise<AllAnimeAPIResponse> {
	const url = page
		? `https://api.jikan.moe/v4/top/anime?filter=airing&page=${page}`
		: "https://api.jikan.moe/v4/top/anime?filter=airing";
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<AllAnimeAPIResponse>;
}

export async function retrieveUpcomingAnime(
	page?: number
): Promise<AllAnimeAPIResponse> {
	const url = page
		? `https://api.jikan.moe/v4/top/anime?filter=upcoming&page=${page}`
		: "https://api.jikan.moe/v4/top/anime?filter=upcoming";
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<AllAnimeAPIResponse>;
}

export async function retrieveAnimeDetails(
	animeId: string
): Promise<AnimeDetailsAPIResponse> {
	const url = `https://api.jikan.moe/v4/anime/${animeId}`;
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<AnimeDetailsAPIResponse>;
}
