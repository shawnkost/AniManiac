import { LightBulbIcon } from "@heroicons/react/24/solid";

function Navbar(): JSX.Element {
	return (
		<header className="bg-deep-indigo py-2 text-white">
			<div className="container m-auto">
				<nav className="flex items-center justify-between px-3">
					<a className="font-montserrat text-2xl font-bold" href="#home">
						AniManiac
					</a>
					<LightBulbIcon className="size-5" />
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
