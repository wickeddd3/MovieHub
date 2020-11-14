import Home from '@/app/pages/Home.vue';
import Movies from '@/app/pages/Movies.vue';
import Movie from '@/app/pages/Movie.vue';
import TVShows from '@/app/pages/TVShows';
import TVShow from '@/app/pages/TVShow';
import Search from '@/app/pages/Search';

const appRoutes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movies/:query',
      name: 'FilteredMovies',
      component: Movies
    },
    {
      path: '/movie/:movie_id',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/tv-shows',
      name: 'TVShows',
      component: TVShows
    },
    {
      path: '/tv-shows/:query',
      name: 'FilteredTVShows',
      component: TVShows
    },
    {
      path: '/tv-show/:tv_id',
      name: 'TVShow',
      component: TVShow
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
];

export default appRoutes;