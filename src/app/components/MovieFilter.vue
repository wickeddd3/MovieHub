<template>
<div class="card">
    <div :class="{'card__header': true, 'card__header--collapse': collapse}">
        <span>Filters</span>
        <svg class="card__header-icon" @click="collapse = !collapse">
            <use xlink:href="../../assets/sprite.svg#icon-chevron-right"></use>
        </svg>
    </div>
    <div :class="{'card__body': true, 'card__body--collapse': collapse}">
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
</template>

<script>
export default {
    props:['genres'],

    data() {
        return {
            collapse: false
        }
    }
}
</script>