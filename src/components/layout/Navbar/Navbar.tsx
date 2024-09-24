import { LightBulbIcon as LightBulbOff } from "@heroicons/react/24/outline";
import { LightBulbIcon as LightBulbOn } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function Navbar(): JSX.Element {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		const preference = localStorage.getItem("theme");
		if (!preference) return;
		setTheme(preference);
	}, []);

	function handleOnClick(): void {
		if (theme === "dark") {
			localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
			setTheme("light");
		} else {
			localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
			setTheme("dark");
		}
	}

	const lightBulb =
		theme === "dark" ? (
			<LightBulbOff className="size-5 cursor-pointer" onClick={handleOnClick} />
		) : (
			<LightBulbOn className="size-5 cursor-pointer" onClick={handleOnClick} />
		);

	return (
		<header className="bg-deep-indigo py-2 text-white transition-colors duration-300 dark:bg-navy-blue">
			<div className="container m-auto">
				<nav className="flex items-center justify-between px-3">
					<a className="font-montserrat text-2xl font-bold" href="#home">
						AniManiac
					</a>
					{lightBulb}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
