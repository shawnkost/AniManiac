import { Field, Label, Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
	retrieveAiringAnime,
	retrieveTopAnime,
	retrieveUpcomingAnime,
} from "../common/queries";
import type { AllAnimeAPIResponse, FunctionComponent } from "../common/types";
import {
	AnimeContainer,
	Navbar,
	SkeletonAnimeContainer,
} from "../components/layout";
import { useAnimeSelectStore } from "../store/animeSelectStore";

export const Home = (): FunctionComponent => {
	const { page, selectedOption, setPage, setSelectedOption } =
		useAnimeSelectStore();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	function getQueryFunction(
		option: string
	): (page: number) => Promise<AllAnimeAPIResponse> {
		switch (option) {
			case "airing":
				return (page) => retrieveAiringAnime(page);
			case "upcoming":
				return (page) => retrieveUpcomingAnime(page);
			default:
				return (page) => retrieveTopAnime(page);
		}
	}

	const { isPending, isError, data, error } = useQuery({
		queryKey: [selectedOption, page],
		queryFn: () => getQueryFunction(selectedOption)(page),
	});
	if (isError)
		return (
			<div>
				Error: {error instanceof Error ? error.message : "An error occurred"}
			</div>
		);

	function handleOnChange(event: React.ChangeEvent<HTMLSelectElement>): void {
		setSelectedOption(event.target.value);
	}

	return (
		<>
			<Navbar />
			<main className="transition-colors duration-300">
				<div className="container m-auto">
					<div className="flex flex-wrap items-center justify-between px-3 py-3 sm:flex-nowrap dark:text-white">
						<h1 className="mb-2 font-montserrat text-4xl font-bold sm:mb-0">
							{selectedOption === "top" && "Top Anime"}
							{selectedOption === "airing" && "Airing Anime"}
							{selectedOption === "upcoming" && "Upcoming Anime"}
						</h1>
						<Field>
							<Label className="mr-1">Currently Viewing:</Label>
							<Select
								aria-label="Anime"
								className="font-hind font-normal text-black"
								name="anime"
								value={selectedOption}
								onChange={handleOnChange}
							>
								<option value="top">Top Anime</option>
								<option value="airing">Airing Anime</option>
								<option value="upcoming">Upcoming Anime</option>
							</Select>
						</Field>
					</div>
				</div>
				{isPending && <SkeletonAnimeContainer />}
				{data && <AnimeContainer anime={data.data} />}
				<div className="mb-6 flex items-center justify-center space-x-2 dark:text-white">
					<button
						className="rounded border px-3 py-1 hover:bg-gray-200 disabled:opacity-50 dark:hover:bg-gray-700"
						disabled={page === 1}
						onClick={() => {
							setPage(Math.max(1, page - 1));
						}}
					>
						Previous
					</button>
					{Array.from({ length: 5 }).map((_, index) => {
						const pageNumber = page - 2 + index;
						if (pageNumber > 0) {
							return (
								<button
									key={pageNumber}
									className={`rounded border px-3 py-1 ${
										pageNumber === page
											? "bg-blue-500 text-white"
											: "hover:bg-gray-200 dark:hover:bg-gray-700"
									}`}
									onClick={() => {
										setPage(pageNumber);
									}}
								>
									{pageNumber}
								</button>
							);
						}
						return null;
					})}
					<span>...</span>
					<button
						className="rounded border px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
						onClick={() => {
							setPage(page + 1);
						}}
					>
						Next
					</button>
				</div>
			</main>
		</>
	);
};
