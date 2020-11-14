<template>
<div class="media m-b-2">
    <div class="media__img">
        <template v-if="movie.poster_path">
            <img :data-src="`//image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path}`" 
                :data-srcset="`//image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path} 1x, 
                //image.tmdb.org/t/p/w188_and_h282_bestv2/${movie.poster_path} 2x`" 
                alt="Batman" 
                :src="`//image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path}`" 
                :srcset="`//image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path} 1x, 
                //image.tmdb.org/t/p/w188_and_h282_bestv2/${movie.poster_path} 2x`" 
                data-loaded="true">
        </template>
        <template v-else>
            <img src="../../assets/noimage.png" alt="No Image">
        </template>
    </div>
    <div class="media__content">
        <div>
            <a :href="`${moviePath(movie)}`">
                <h1 class="heading-secondary text-dark">{{ movieName(movie) }}</h1>
            </a>
            <h1 class="heading-tertiary text-light">{{ movieDate(movie) }}</h1>
        </div>
        <div>
            <p class="paragraph">{{ movieOverview(movie) }}</p>
        </div>
    </div>
</div>
</template>

<script>
import dateFormat from '@/app/mixins/dateFormat';

export default {
    props:[
        'movie', 
        'media_type', 
        'movie_id'
    ],

    mixins:[dateFormat],

    methods: {
        movieName(movie) {
            return (this.media_type == "season") ? movie.name : this.resultName(movie);
        },
        movieDate(movie) {
            return (this.media_type == "season") 
                ? `${this.getMonthYear(movie.air_date)} | ${movie.episode_count} seasons`
                : this.resultDate(movie);
        },
        movieOverview(movie) {
            return (movie.media_type ==  'movie' || movie.media_type == 'tv') ? movie.overview : '';
        },
        moviePath(movie) {
            if(movie.media_type == 'movie') {
                return `/movie/${movie.id}`;
            } else if(movie.media_type == 'tv') {
                return `/tv-show/${movie.id}`;
            } else if(this.media_type == "season") {
                return `/tv-show/${this.movie_id}`;
            }
            return;
        },
        resultName(result) {
            if(result.media_type == 'movie') {
                return result.title;
            } else if(result.media_type == 'tv' || result.media_type == 'person') {
                return result.name;
            }
            return; 
        },
        resultDate(result) {
            if(result.media_type == 'movie') {
                return this.formatDateToLongDate(result.release_date);
            } else if(result.media_type == 'tv') {
                return this.formatDateToLongDate(result.first_air_date);
            }
            return
        }
    }
}
</script>