import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { retrieveAnimeDetails } from "../common/queries";
import { Navbar } from "../components/layout";
import SkeletonAnimeDetails from "../components/layout/Skeleton/SkeletonAnimeDetails";

function AnimeDetails(): JSX.Element {
	const { animeId } = useParams({ from: "/anime/$animeId" });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["animeDetails", animeId],
		queryFn: () => retrieveAnimeDetails(animeId),
	});

	if (isError)
		return (
			<div className="flex h-screen items-center justify-center dark:text-white">
				Error: {error instanceof Error ? error.message : "An error occurred"}
			</div>
		);

	if (isPending) return <SkeletonAnimeDetails />;

	const animeDetails = data?.data;

	return (
		<>
			<Navbar />
			<main className="transition-colors duration-300">
				<div className="container m-auto">
					<div className="px-3">
						<h2 className="mb-3 pt-3 text-center font-montserrat text-2xl font-bold dark:text-white">
							{animeDetails?.title}
						</h2>
						<div className="mb-3 flex flex-col gap-4 md:flex-row">
							<div className="w-full md:w-1/3 lg:w-1/4">
								<img
									alt={animeDetails?.title}
									className="h-auto w-full rounded-lg"
									src={animeDetails?.images.jpg.image_url}
								/>
							</div>
							<div className="w-full md:w-2/3 lg:w-3/4">
								<p className="dark:text-white">{animeDetails?.synopsis}</p>
							</div>
						</div>
						{animeDetails?.trailer.embed_url && (
							<div className="relative mb-3 overflow-hidden pt-[56.25%]">
								<iframe
									allowFullScreen
									className="absolute left-0 top-0 h-full w-full rounded-lg"
									loading="lazy"
									src={`${animeDetails.trailer.embed_url}?autoplay=0`}
									title={`${animeDetails.title} trailer`}
								/>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}

export default AnimeDetails;
