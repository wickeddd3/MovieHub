<template>
<div class="container--fluid">

    <div class="main">
        <h1 class="heading-title m-l-2">{{ query_type }}</h1>
        <div class="container__row">
            <div class="main__sidebar container__col-xl-3 container__col-lg-4 container__col-md-12">
                <div class="container__row">
                    <div class="card m-b-2">
                        <div class="card__header">
                            <span>Sort</span>
                            <svg class="card__header-icon">
                                <use xlink:href="../../assets/sprite.svg#icon-chevron-right"></use>
                            </svg>
                        </div>
                        <div class="card__body">
                            <span class="m-b-1">Sort Results By</span>
                            <select name="sort" id="sort" class="select">
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card__header">
                            <span>Filters</span>
                            <svg class="card__header-icon">
                                <use xlink:href="../../assets/sprite.svg#icon-chevron-right"></use>
                            </svg>
                        </div>
                        <div class="card__body">
                            <div class="card__body-item">
                                <span class="card__body-item-title">Release Dates</span>
                                <div class="date-range">
                                    <div class="date-range__from">
                                        <span>from</span>
                                        <input type="date" class="input-date m-b-1">
                                    </div>
                                    <div class="date-range__to">
                                        <span>to</span>
                                        <input type="date" class="input-date">
                                    </div>
                                </div>
                            </div>
                            <div class="card__body-item">
                                <span class="card__body-item-title">Genres</span>
                                <template v-for="genre in genres">
                                    <span class="pill" :key="genre.id">{{ genre.name }}</span>
                                </template>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn--search m-t-2">Search</button>
                </div>
            </div>
            <div class="main__content container__col-xl-9 container__col-lg-8 container__col-md-12">
                <div class="container__row">
                    <template v-for="(movie, index) in movies">
                        <div :key="index" class="container__col-sm-6 container__col-md-4 container__col-lg-3 container__col-xl-3">
                            <div class="poster">
                                <div class="poster__header">
                                    <a :href="`/tv-show/${movie.id}`">
                                        <img class="poster__header-img--medium" 
                                            :data-src="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`" 
                                            :data-srcset="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path} 1x, 
                                            //image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path} 2x`" 
                                            alt="" 
                                            :src="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`" 
                                            :srcset="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path} 1x, 
                                            //image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path} 2x`" 
                                            data-loaded="true">
                                    </a>
                                </div>
                                <div class="poster__body">
                                    <h2 class="heading-secondary heading-tertiary--dark">{{ movie.name }}</h2>
                                    <h3 class="heading-tertiary heading-tertiary--light">{{ formatDateToLongDate(movie.first_air_date) }}</h3>
                                </div>
                            </div>
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
import Footer from '@/app/layouts/Footer';
import dateFormat from '@/app/mixins/dateFormat';

export default {
    components: {
        Footer
    },

    mixins:[dateFormat],

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