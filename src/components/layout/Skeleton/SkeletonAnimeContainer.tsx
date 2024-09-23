import "../../../styles/skeleton.css";

function SkeletonAnimeContainer(): JSX.Element {
	return (
		<div className="container m-auto">
			<div className="grid grid-cols-2 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{Array.from({ length: 25 }).map((_, index) => (
					<div key={index} className="mb-3 pb-3 pr-3">
						<div className="mb-1">
							<div
								aria-hidden="true"
								className="skeleton h-[300px] w-full rounded lg:h-[315px]"
							/>
						</div>
						<div>
							<h2
								aria-hidden="true"
								className="skeleton skeleton-text mb-1 h-6 w-3/4 font-montserrat font-bold"
							></h2>
							<h3
								aria-hidden="true"
								className="font-regular skeleton skeleton-text h-4 w-1/2 font-hind"
							></h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default SkeletonAnimeContainer;
