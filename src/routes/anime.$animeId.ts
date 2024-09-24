import { createFileRoute } from "@tanstack/react-router";
import AnimeDetails from "../pages/AnimeDetails";

export const Route = createFileRoute("/anime/$animeId")({
	component: AnimeDetails,
	loader: ({ params }) => params.animeId,
});
