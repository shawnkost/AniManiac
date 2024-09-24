import { Navbar } from "../components/layout";

function NotFoundPage(): React.ReactElement {
	return (
		<>
			<Navbar />
			<div className="flex h-screen flex-col items-center justify-center dark:text-white">
				<h1 className="text-4xl font-bold">404 - Page Not Found</h1>
				<p className="text-lg">
					Sorry, the page you are looking for does not exist.
				</p>
			</div>
		</>
	);
}

export default NotFoundPage;
