<template>
<div class="card">
    <div :class="{'card__header': true, 'card__header--collapse': collapse}">
        <span>Sort</span>
        <svg class="card__header-icon" @click="collapse = !collapse">
            <use xlink:href="../../assets/sprite.svg#icon-chevron-right"></use>
        </svg>
    </div>
    <div :class="{'card__body': true, 'card__body--collapse': collapse}">
        <span class="m-b-1">Sort Results By</span>
        <select name="sort" id="sort" class="select">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            collapse: false
        }
    }
}
</script>