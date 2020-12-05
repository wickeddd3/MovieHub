<template>
<div class="container--fluid">
    <div class="header">
        <h1 class="heading-title--main text-white">Welcome to MovieHub</h1>
        <h1 class="heading-title--sub text-white">Explore millions of movies and tv shows</h1>
        <form @submit.prevent="search" class="header__search">
            <svg class="header__search-icon">
                <use xlink:href="../../assets/sprite.svg#icon-magnifying-glass"></use>
            </svg>
            <input type="text" v-model="search_input" placeholder="Search for a movie or tv show" class="header__search-input">
            <button type="submit" class="header__search-button">Search</button>
        </form>
    </div>
    <div class="main">
        <MovieSection :type="'movie'" :movies="popular_movies" :title="popular_movies_title" v-if="popular_movies.length > 0" />
        <MovieSection :type="'movie'" :movies="top_rated_movies" :title="top_rated_movies_title" v-if="top_rated_movies.length > 0" />
        <MovieSection :type="'movie'" :movies="upcoming_movies" :title="upcoming_movies_title" v-if="upcoming_movies.length > 0" />
    </div>
    <Footer/>
</div>
</template>

<script>
import MovieSection from '@/app/components/MovieSection';
import Footer from '@/app/layouts/Footer';

export default {
    components: {
        MovieSection,
        Footer
    },

    data() {
        return {
            popular_movies_title:"Popular",
            popular_movies:[],
            top_rated_movies_title:"Top Rated",
            top_rated_movies:[],
            upcoming_movies_title:"Upcoming",
            upcoming_movies:[],
            search_input:""
        }
    },

    created() {
        this.popularMovies();
        this.topRatedMovies();
        this.upcomingMovies();
    },

    methods: {
        popularMovies() {
            this.$movie.get(`/3/movie/popular?language=en-US&page=1`)
                .then(res => {
                    this.popular_movies = res.data.results;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        topRatedMovies() {
            this.$movie.get(`/3/movie/top_rated?language=en-US&page=1`)
                .then(res => {
                    this.top_rated_movies = res.data.results;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        upcomingMovies() {
            this.$movie.get(`/3/movie/upcoming?language=en-US&page=1`)
                .then(res => {
                    this.upcoming_movies = res.data.results;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        search() {
            this.$router.push({name: 'Search', params:{query:this.search_input} })
        }
    }
}
</script>