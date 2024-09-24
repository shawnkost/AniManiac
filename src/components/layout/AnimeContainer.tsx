import { Link } from "@tanstack/react-router";
import type { AnimeData } from "../../common/types";

type AnimeContainerProps = {
	anime: Array<AnimeData>;
};

function AnimeContainer({ anime }: AnimeContainerProps): JSX.Element {
	return (
		<div className="container m-auto">
			<div className="grid grid-cols-2 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:text-white">
				{anime.map((animeItem) => (
					<Link
						key={animeItem.mal_id}
						className="mb-3 pb-3 pr-3"
						to={`/anime/${animeItem.mal_id}`}
					>
						<div className="mb-1 aspect-[2/3]">
							<img
								alt={animeItem.title}
								className="h-full w-full cursor-pointer rounded transition-transform hover:scale-105"
								src={animeItem.images.jpg.image_url}
							/>
						</div>
						<div>
							<h2 className="mb-1 font-montserrat font-bold">
								{animeItem.title_english
									? animeItem.title_english
									: animeItem.title}
							</h2>
							<h3 className="font-regular font-hind">
								Rating: {animeItem.score ? animeItem.score : "N/A"}
							</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default AnimeContainer;
