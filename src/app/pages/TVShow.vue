<template>
<div class="container--fluid">
    <div class="movie">
        <img class="movie__background" 
            :data-src="`//image.tmdb.org/t/p/w533_and_h300_bestv2/${movie.backdrop_path}`" 
            :data-srcset="`//image.tmdb.org/t/p/w533_and_h300_bestv2/${movie.backdrop_path} 1x, 
            //image.tmdb.org/t/p/w1066_and_h600_bestv2/${movie.backdrop_path} 2x`" 
            alt="2067" 
            :src="`//image.tmdb.org/t/p/w533_and_h300_bestv2/${movie.backdrop_path}`" 
            :srcset="`//image.tmdb.org/t/p/w533_and_h300_bestv2/${movie.backdrop_path} 1x, 
            //image.tmdb.org/t/p/w1066_and_h600_bestv2/${movie.backdrop_path} 2x`" 
            data-loaded="true">

        <div class="movie__poster">                    
            <img class="movie__poster--poster" 
                :src="`//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" 
                :data-src="`//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" 
                :data-srcset="`//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path} 1x, 
                //image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path} 2x`" 
                alt="" 
                :srcset="`//image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path} 1x, 
                //image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path} 2x`" 
                data-loaded="true">
        </div>

        <div class="movie__content">
            <div class="movie__content-item">
                <h1 class="heading-title--sub text-white">
                    {{ movie.name }} ({{ getDateFullYear(movie.first_air_date) }})
                </h1>
            </div>
            <div class="movie__content-item">
                <h1 class="heading-secondary text-white">
                    <template v-for="(genre, index) in movie.genres">
                        <span :key="genre.id">
                            {{ genre.name }}<i v-if="index+1 != movie.genres.length">, </i>
                        </span>
                    </template>
                </h1>
            </div>
            <div class="movie__content-item">
                <h1 class="heading-secondary text-white">
                    {{ movie.number_of_seasons }} season(s) | {{ movie.number_of_episodes }} episodes
                </h1>
            </div>
            <div class="movie__content-item">
                <div class="movie__content-rate">
                    <span class="movie__content-rate-btn">
                        <svg class="movie__content-rate-btn-icon">
                            <use xlink:href="../../assets/sprite.svg#icon-list"></use>
                        </svg>
                    </span>
                    <span class="movie__content-rate-btn">
                        <svg class="movie__content-rate-btn-icon">
                            <use xlink:href="../../assets/sprite.svg#icon-heart"></use>
                        </svg>
                    </span>
                    <span class="movie__content-rate-btn">
                        <svg class="movie__content-rate-btn-icon">
                            <use xlink:href="../../assets/sprite.svg#icon-bookmark"></use>
                        </svg>
                    </span>
                    <span class="movie__content-rate-btn">
                        <svg class="movie__content-rate-btn-icon">
                            <use xlink:href="../../assets/sprite.svg#icon-star"></use>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="movie__content-item">
                <h1 class="heading-secondary text-white">Overview</h1>
                <p class="paragraph text-white">{{ movie.overview }}</p>
            </div>
            <div class="movie__content-item">
                <a :href="`https://youtube.com/watch?v=${video}`" target="_blank" class="btn btn--trailer">
                    <svg class="btn--trailer__icon">
                        <use xlink:href="../../assets/sprite.svg#icon-triangle-right"></use>
                    </svg>
                    <span>Watch Trailer</span>
                </a>
            </div>
        </div>
    </div>

    <div class="season">
        <h1 class="heading-title m-b-2">Seasons</h1>
        <template v-for="season in movie.seasons">
            <MovieMedia :key="season.id" :movie="season" :movie_id="movie.id" :media_type="'season'" />
        </template>
    </div>

    <MovieSection :type="'tv-show'" :movies="recommended_movies" :title="recommended_movies_title" v-if="recommended_movies.length > 0"/>
    <MovieSection :type="'tv-show'" :movies="similar_movies" :title="similar_movies_title" v-if="similar_movies.length > 0"/>
        
    <Footer/>
</div>
</template>

<script>
import MovieMedia from '@/app/components/MovieMedia';
import MovieSection from '@/app/components/MovieSection';
import Footer from '@/app/layouts/Footer';
import dateFormat from '@/app/mixins/dateFormat';

export default {
    components: {
        MovieMedia,
        MovieSection,
        Footer
    },

    mixins:[dateFormat],

    data() {
        return {
            movie:{},
            video:{},
            similar_movies_title:"Similar Movies",
            similar_movies:[],
            recommended_movies_title:"Recommendations",
            recommended_movies:[],
        }
    },

    created() {
        this.fetchMovie();
        this.fetchMovieVideos();
        this.similarMovies();
        this.recommendedMovies();
    },

    methods: {
        fetchMovie() {
            this.$movie.get(`/3/tv/${this.$route.params.tv_id}?language=en-US`)
                .then(res => {
                    this.movie = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        fetchMovieVideos() {
            this.$movie.get(`/3/tv/${this.$route.params.tv_id}/videos?language=en-US`)
                .then(res => {
                    let result = res.data.results;
                    this.video = result[0].key;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        recommendedMovies() {
            this.$movie.get(`/3/tv/${this.$route.params.tv_id}/recommendations?language=en-US&page=1`)
                .then(res => {
                    this.recommended_movies = res.data.results;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        similarMovies() {
            this.$movie.get(`/3/tv/${this.$route.params.tv_id}/similar?language=en-US&page=1`)
                .then(res => {
                    this.similar_movies = res.data.results;
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }
}
</script>