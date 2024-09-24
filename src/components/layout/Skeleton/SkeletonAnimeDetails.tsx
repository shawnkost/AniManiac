import "../../../styles/skeleton.css";
import Navbar from "../Navbar/Navbar";

function SkeletonAnimeDetails(): JSX.Element {
	return (
		<>
			<Navbar />
			<main className="transition-colors duration-300">
				<div className="container m-auto">
					<div className="px-3 py-3">
						<h2 className="skeleton skeleton-text mx-auto mb-3 h-8 w-3/4 pt-3"></h2>
						<div className="mb-3 flex flex-col gap-4 md:flex-row">
							<div
								aria-hidden="true"
								className="skeleton h-[400px] w-full rounded-lg md:w-1/3 lg:w-1/4"
							></div>
							<div className="w-full md:w-2/3 lg:w-3/4">
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text mb-2 h-4 w-full"
								></div>
								<div
									aria-hidden="true"
									className="skeleton skeleton-text h-4 w-3/4"
								></div>
							</div>
						</div>

						<div className="relative mb-3 overflow-hidden pt-[56.25%]">
							<div
								aria-hidden="true"
								className="skeleton absolute left-0 top-0 h-full w-full rounded-lg"
							></div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default SkeletonAnimeDetails;
