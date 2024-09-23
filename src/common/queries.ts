import type { APIResponse } from "./types";

export async function retrieveTopAnime(): Promise<APIResponse> {
	const url = "https://api.jikan.moe/v4/top/anime";
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<APIResponse>;
}

export async function retrieveAiringAnime(): Promise<APIResponse> {
	const url = "https://api.jikan.moe/v4/top/anime?filter=airing";
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<APIResponse>;
}
export async function retrieveUpcomingAnime(): Promise<APIResponse> {
	const url = "https://api.jikan.moe/v4/top/anime?filter=upcoming";
	const response = await fetch(url);
	if (!response.ok) throw new Error("Network response was not ok");
	return response.json() as Promise<APIResponse>;
}
