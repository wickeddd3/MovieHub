<template>
<div class="section">
    <h1 class="heading-title">{{ title }}</h1>
    <div class="section__content container__row">
        <template v-for="movie in movies">
            <div :key="movie.id" class="section__item">
                <div class="poster">
                    <div class="poster__header">
                        <a :href="moviePath(movie)">
                            <img class="poster__header-img" 
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
                        <h2 class="heading-secondary text-dark">{{ movieName(movie) }}</h2>
                        <h3 class="heading-tertiary text-light">{{ movieDate(movie) }}</h3>
                    </div>
                </div>
            </div>
        </template>
    </div>
</div>
</template>

<script>
import dateFormat from '@/app/mixins/dateFormat';

export default {
    props:['type', 'title', 'movies'],
    
    mixins:[dateFormat],

    methods: {
        movieName(movie) {
            return (this.type == 'movie') ? movie.title : movie.name;
        },
        movieDate(movie) {
            if(movie.release_date != "" || movie.first_air_date != "") {
            return (this.type == 'movie') 
                ? this.formatDateToLongDate(movie.release_date) 
                : this.formatDateToLongDate(movie.first_air_date);
            } 
            return;
        },
        moviePath(movie) {
            return (this.type == 'movie') ? `/movie/${movie.id}` : `/tv-show/${movie.id}`;
        }
    }
}
</script>