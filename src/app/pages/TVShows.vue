<template>
<div class="container--fluid">
    <div class="main">
        <h1 class="heading-title m-l-2">{{ query_type }}</h1>
        <div class="container__row">
            <div class="main__sidebar container__col-xl-3 container__col-lg-4 container__col-12">
                <div class="container__row">
                    <MovieSort class="m-b-2"/>
                    <MovieFilter :genres="genres" />
                    <button class="btn btn--search m-t-2">Search</button>
                </div>
            </div>
            <div class="main__content container__col-xl-9 container__col-lg-8 container__col-12">
                <div class="container__row center">
                    <template v-for="(movie, index) in movies">
                        <div :key="index" class="container__col-sm-6 container__col-md-4 container__col-lg-3 container__col-xl-3">
                            <a :href="`/tv-show/${movie.id}`">
                                <MoviePoster :movie="movie" :name="movie.name" :date="movie.first_air_date" />
                            </a>
                        </div>
                    </template>
                    <button class="btn btn--loadmore" @click="loadMore">Load More</button>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
</div>
</template>

<script>
import MovieSort from '@/app/components/MovieSort';
import MovieFilter from '@/app/components/MovieFilter';
import MoviePoster from '@/app/components/MoviePoster';
import Footer from '@/app/layouts/Footer';

export default {
    components: {
        MovieSort,
        MovieFilter,
        MoviePoster,
        Footer
    },

    data() {
        return {
            movies:[],
            genres:[],
            page:1,
            query_type:""
        }
    },

    watch: {
        '$route': 'fetchMoviesByQuery'
    },

    created() {
        this.fetchMovies();
        this.fetchGenres();
    },

    methods: {
        fetchMovies() {
            let page = this.page
            let query_type = this.queryType(location.pathname);
            this.$movie.get(`/3/tv/${query_type}?language=en-US&page=${page}`)
                .then(res => {
                    let movies = res.data.results;
                    this.movies = [...this.movies, ...movies];
                })
                .catch(err => {
                    console.log(err);
                })
        },
        fetchGenres() {
            this.$movie.get('/3/genre/tv/list?language=en-US')
                .then(res => {
                    this.genres = res.data.genres;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        fetchMoviesByQuery() {
            this.movies = [];
            this.fetchMovies();
        },
        queryType(pathname) {
            let query;
            switch(pathname) {
                case "/tv-shows":
                    query = "popular";
                    this.query_type = "Popular TV Shows";
                    break;
                case "/tv-shows/airing-today":
                    query = "airing_today";
                    this.query_type = "TV Shows Airing Today";
                    break;
                case "/tv-shows/on-the-air":
                    query = "on_the_air";
                    this.query_type = "Currently Airing TV Shows"
                    break;
                case "/tv-shows/top-rated":
                    query = "top_rated";
                    this.query_type = "Top Rated TV Shows"
                    break;
                default:
                    query = "popular";
                    this.query_type = "Popular TV Shows";
            }
            return query;
        },
        loadMore() {
            this.page++;
            this.fetchMovies();
        }
    }
}
</script>