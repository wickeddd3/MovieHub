<template>
<div class="poster">
    <div class="poster__header">
        <img class="poster__header-img--medium" 
            :data-src="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`" 
            :data-srcset="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path} 1x, 
            //image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path} 2x`" 
            alt="" 
            :src="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`" 
            :srcset="`//image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path} 1x, 
            //image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path} 2x`" 
            data-loaded="true">
    </div>
    <div class="poster__body">
        <h2 class="heading-secondary heading-tertiary--dark">{{ name }}</h2>
        <h3 class="heading-tertiary heading-tertiary--light">{{ formatDateToLongDate(date) }}</h3>
    </div>
</div>
</template>

<script>
import dateFormat from '@/app/mixins/dateFormat';

export default {
    props:[
        'movie',
        'name',
        'date',
    ],

    mixins:[dateFormat],
}
</script>