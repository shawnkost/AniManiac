import { LightBulbIcon } from "@heroicons/react/24/solid";

function Navbar(): JSX.Element {
	return (
		<header className="bg-deep-indigo text-white py-2">
			<div className="container m-auto">
				<nav className="flex items-center justify-between px-3">
					<a className="font-montserrat font-bold text-2xl" href="#home">
						AniManiac
					</a>
					<LightBulbIcon className="size-5" />
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
