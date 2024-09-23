import type { AnimeData } from "../../common/types";

type AnimeContainerProps = {
	anime: Array<AnimeData>;
};

function AnimeContainer({ anime }: AnimeContainerProps): JSX.Element {
	return (
		<div className="container m-auto">
			<div className="grid grid-cols-2 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{anime.map((animeItem) => (
					<div key={animeItem.mal_id} className="mb-3 pb-3 pr-3">
						<div className="mb-1">
							<img
								alt={animeItem.title}
								className="h-[300px] w-full cursor-pointer rounded transition-transform hover:scale-105 lg:h-[315px]"
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
					</div>
				))}
			</div>
		</div>
	);
}

export default AnimeContainer;
