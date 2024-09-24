import { Field, Label, Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	retrieveAiringAnime,
	retrieveTopAnime,
	retrieveUpcomingAnime,
} from "../common/queries";
import type { APIResponse, FunctionComponent } from "../common/types";
import {
	AnimeContainer,
	Navbar,
	SkeletonAnimeContainer,
} from "../components/layout";

export const Home = (): FunctionComponent => {
	const [selectedOption, setSelectedOption] = useState("top");

	function getQueryFunction(option: string): () => Promise<APIResponse> {
		switch (option) {
			case "airing":
				return retrieveAiringAnime;
			case "upcoming":
				return retrieveUpcomingAnime;
			default:
				return retrieveTopAnime;
		}
	}

	const { isPending, isError, data, error } = useQuery({
		queryKey: [selectedOption],
		queryFn: () => getQueryFunction(selectedOption)(),
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
			<main className="bg-eggshell transition-colors duration-300 dark:bg-dark-blue">
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
			</main>
		</>
	);
};
