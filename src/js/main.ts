const $allAnimeView = document.querySelector('.all-anime') as HTMLDivElement;
const $individualAnimeView = document.querySelector(
  '.individual-anime'
) as HTMLDivElement;
const $animeContainer = document.querySelector(
  '.anime-container'
) as HTMLDivElement;
const $animeSelect = document.getElementById(
  'anime-select'
) as HTMLSelectElement;
const $pageH1 = document.querySelector('h1') as HTMLHeadingElement;
const $loader = document.querySelector('.loader') as HTMLDivElement;
const $homeTag = document.querySelector('.home-tag') as HTMLAnchorElement;
const $lightBulb = document.querySelector('.light-dark-mode') as HTMLElement;
const $pageContainer = document.querySelector(
  '.page-container'
) as HTMLDivElement;

interface APIResponse {
  pagination: object;
  data: AnimeData[];
}

interface Images {
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
}

interface Trailer {
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
}

interface AnimeData {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: object[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: object[];
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
}

interface Data {
  theme: string;
  topAnime: Anime;
  airingAnime: Anime;
  upcomingAnime: Anime;
}

interface Anime {
  shows: AnimeData[];
}

const localStorageTheme = localStorage.getItem('theme');

const data: Data = {
  theme: localStorageTheme ? localStorageTheme : 'light',
  topAnime: {
    shows: [],
  },
  airingAnime: {
    shows: [],
  },
  upcomingAnime: {
    shows: [],
  },
};

/** Getting the top anime of all time from the API and appending the images/titles to the home page */
async function getTopAnime() {
  showLoadingSpinner();
  const response = await fetch('https://api.jikan.moe/v4/top/anime');
  const JSONData: APIResponse = await response.json();
  const animeData: AnimeData[] = JSONData.data;
  if (animeData) {
    for (let i = 0; i < animeData.length; i++) {
      const animeObject = animeData[i];
      data.topAnime.shows.push(animeObject);
      const anime: AnimeData = animeObject;
      const renderedAnime = renderAnime(anime);
      renderedAnime.addEventListener('click', () => {
        const $individualAnime = renderIndividualAnime(anime);
        $individualAnimeView.appendChild($individualAnime);
        viewSwap('anime');
      });
      $animeContainer.appendChild(renderedAnime);
    }
  }
  hideLoadingSpinner();
}

/** Getting the current top airing anime from the API and appending the images/titles to the home page */
async function getTopAiringAnime() {
  showLoadingSpinner();
  const response = await fetch(
    'https://api.jikan.moe/v4/top/anime?filter=airing'
  );
  const JSONData: APIResponse = await response.json();
  const animeData: AnimeData[] = JSONData.data;
  if (animeData) {
    for (let i = 0; i < animeData.length; i++) {
      const animeObject = animeData[i];
      data.airingAnime.shows.push(animeObject);
      const anime: AnimeData = animeObject;
      const renderedAnime = renderAnime(anime);
      renderedAnime.addEventListener('click', () => {
        const $individualAnime = renderIndividualAnime(anime);
        $individualAnimeView.appendChild($individualAnime);
        viewSwap('anime');
      });
      $animeContainer.appendChild(renderedAnime);
    }
  }
  hideLoadingSpinner();
}

/** Getting the current top upcoming anime from the API and appending the images/titles to the home page */
async function getTopUpcomingAnime() {
  showLoadingSpinner();
  const response = await fetch(
    'https://api.jikan.moe/v4/top/anime?filter=upcoming'
  );
  const JSONData: APIResponse = await response.json();
  const animeData: AnimeData[] = JSONData.data;
  if (animeData) {
    for (let i = 0; i < animeData.length; i++) {
      const animeObject = animeData[i];
      data.upcomingAnime.shows.push(animeObject);
      const anime: AnimeData = animeObject;
      const renderedAnime = renderAnime(anime);
      renderedAnime.addEventListener('click', () => {
        const $individualAnime = renderIndividualAnime(anime);
        $individualAnimeView.appendChild($individualAnime);
        viewSwap('anime');
      });
      $animeContainer.appendChild(renderedAnime);
    }
  }
  hideLoadingSpinner();
}

/**
 * Creates the DOM elements for the anime image
 * @param anime - All details about the anime.
 * @returns A `div` element containing an image for the anime
 */
function renderAnimeImage(anime: AnimeData) {
  const $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'column-full image-container');

  const $img = document.createElement('img');
  $img.setAttribute('class', 'border-color');
  $img.setAttribute('src', anime.images.jpg.image_url);
  $img.setAttribute('alt', anime.title);
  $img.setAttribute('title', anime.title);

  $imgContainer.appendChild($img);
  return $imgContainer;
}

/**
 * Creates the DOM elements for the anime info text
 * @param anime - All details about the anime.
 * @returns A `div` element containing the text content
 */
function renderAnimeText(anime: AnimeData) {
  const $textContainer = document.createElement('div');
  $textContainer.setAttribute('class', 'column-full text-container');

  const $animeTitle = document.createElement('h2');
  $animeTitle.textContent = anime.title_english
    ? anime.title_english
    : anime.title;

  const $animeScore = document.createElement('h3');
  $animeScore.textContent = `Rating: ${anime.score}`;

  $textContainer.appendChild($animeTitle);
  $textContainer.appendChild($animeScore);

  return $textContainer;
}

/**
 * Appends the anime text & anime image to the DOM
 * @param anime - All details about the anime.
 * @returns A `div` wrapper for the anime image and text
 */
function renderAnime(anime: AnimeData) {
  const $animeRow = document.createElement('div');
  $animeRow.setAttribute('class', 'anime');

  const $animeImage = renderAnimeImage(anime);
  const $animeText = renderAnimeText(anime);

  $animeRow.appendChild($animeImage);
  $animeRow.appendChild($animeText);

  return $animeRow;
}

/** Removes all child nodes from anime container */
function resetAnimeContainer() {
  $animeContainer.replaceChildren();
}

/** Removes all child nodes from individual anime view */
function resetIndividualAnimeView() {
  $individualAnimeView.replaceChildren();
}

/** Changes the heading text based off of whatever type of anime was selected from dropdown */
function changeHeadingText(selectedAnime: string) {
  $pageH1.textContent = `${selectedAnime} Anime`;
}

/** Shows loading spinner */
function showLoadingSpinner() {
  $loader.classList.remove('hidden');
}

/** Hides loading spinner */
function hideLoadingSpinner() {
  $loader.classList.add('hidden');
}

/**
 * Creates the DOM elements for the individual anime view
 * @param anime - All details about the anime.
 * @returns A `div` element containing all the content for the anime
 */
function renderIndividualAnime(anime: AnimeData) {
  const $row = document.createElement('div');
  $row.className = 'row flex-column';

  const $titleDiv = document.createElement('div');
  $titleDiv.className = 'column-full';
  const $title = document.createElement('h2');
  $title.textContent = anime.title_english ? anime.title_english : anime.title;
  $title.className = 'anime-page-title';

  const $animeContentDiv = document.createElement('div');
  $animeContentDiv.className = 'anime-content column-full';

  const $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-full individual-image-container';
  const $img = document.createElement('img');
  $img.setAttribute('src', anime.images.jpg.large_image_url);
  $img.setAttribute(
    'alt',
    anime.title_english ? anime.title_english : anime.title
  );
  $img.className = 'individual-image';

  const $descDiv = document.createElement('div');
  $descDiv.className = 'column-full anime-description';
  const $desc = document.createElement('p');
  $desc.textContent = anime.synopsis;

  const $iframeDiv = document.createElement('div');
  $iframeDiv.className = 'column-full';
  const $iframe = document.createElement('iframe');
  $iframe.setAttribute(
    'src',
    `https://www.youtube.com/embed/${anime.trailer.youtube_id}`
  );
  $iframe.setAttribute('title', `${$title.textContent} youtube trailer`);
  $iframe.setAttribute('loading', 'lazy');
  $iframe.setAttribute('allow', 'fullscreen; picture-in-picture;');
  $iframe.setAttribute('allowfullscreen', '');

  $row.appendChild($titleDiv);
  $row.appendChild($animeContentDiv);
  $animeContentDiv.appendChild($imgDiv);
  $animeContentDiv.appendChild($descDiv);
  $row.appendChild($iframeDiv);
  $titleDiv.appendChild($title);
  $imgDiv.appendChild($img);
  $descDiv.appendChild($desc);
  $iframeDiv.appendChild($iframe);

  return $row;
}

/** Shows or hides wrappers depending on which view was selected */
function viewSwap(viewName: string) {
  if (viewName === 'home') {
    $allAnimeView.classList.remove('hidden');
    $individualAnimeView.classList.add('hidden');
    resetIndividualAnimeView();
  } else if (viewName === 'anime') {
    $allAnimeView.classList.add('hidden');
    $individualAnimeView.classList.remove('hidden');
  }
  window.scrollTo(0, 0);
}

const root = document.documentElement;
function changeTheme(theme: string) {
  if (theme === 'light') {
    data.theme = 'light';
    localStorage.setItem('theme', data.theme);
    root.style.setProperty('--accent', '#1e152a');
    root.style.setProperty('--main', '#f2f5ea');
    $pageContainer.dataset.theme = 'light';
    $lightBulb.className = 'fas fa-lightbulb light-dark-mode';
  } else if (theme === 'dark') {
    data.theme = 'dark';
    localStorage.setItem('theme', data.theme);
    root.style.setProperty('--accent', '#301E67');
    root.style.setProperty('--main', '#03001C');
    $pageContainer.dataset.theme = 'dark';
    $lightBulb.className = 'far fa-lightbulb light-dark-mode';
  }
}

/** Check which value was selected from dropdown, remove current showing anime shows and make api request */
$animeSelect.addEventListener('change', () => {
  const selectValue = $animeSelect.value;
  switch (selectValue) {
    case 'Top':
      resetAnimeContainer();
      changeHeadingText('Top');
      getTopAnime();
      break;
    case 'Airing':
      resetAnimeContainer();
      changeHeadingText('Top Airing');
      getTopAiringAnime();
      break;
    case 'Upcoming':
      resetAnimeContainer();
      changeHeadingText('Top Upcoming');
      getTopUpcomingAnime();
      break;
  }
});

/** Once the content loads, renders top anime either from localStorage or api depending on how old data is */
window.addEventListener('DOMContentLoaded', () => {
  changeTheme(data.theme);
  getTopAnime();
});

$homeTag.addEventListener('click', () => viewSwap('home'));

$lightBulb.addEventListener('click', () => {
  if (data.theme === 'dark') {
    changeTheme('light');
  } else if (data.theme === 'light') {
    changeTheme('dark');
  }
});
