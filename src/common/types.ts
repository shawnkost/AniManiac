export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;
type IconProps = HeroIconSVGProps & {
	title?: string;
	titleId?: string;
};
export type Heroicon = React.FC<IconProps>;

type Images = {
	jpg: {
		image_url: string;
		large_image_url: string;
		small_image_url: string;
	};
	webp: {
		image_url: string;
		large_image_url: string;
		small_image_url: string;
	};
};
type Trailer = {
	embed_url: string;
	images: {
		image_url: string;
		small_image_url: string;
		medium_image_url: string;
		large_image_url: string;
		maximum_image_url: string;
	};
	url: string;
	youtube_id: string;
};
export type AnimeData = {
	mal_id: number;
	url: string;
	images: Images;
	trailer: Trailer;
	approved: boolean;
	titles: Array<object>;
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: Array<object>;
	type: string;
	source: string;
	episodes: number;
	status: string;
	airing: boolean;
	aired: object;
	duration: string;
	rating: string;
	score: number;
	scored_by: number;
	rank: number;
	popularity: number;
	members: number;
	favorites: number;
	synopsis: string;
	season: string;
	year: number;
};
export type APIResponse = {
	pagination: object;
	data: Array<AnimeData>;
};
