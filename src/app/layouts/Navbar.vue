<template>
<div class="nav">
    <ul class="nav__list nav__list--left">
        <li class="nav__item">
            <router-link to="/" class="nav__name nav__name-app-logo">
                <img src="../../assets/film.jpg" alt="" class="nav__name-logo">
                <span class="nav__name-title heading-title">Movie Hub</span>
            </router-link>
        </li>
        <li class="nav__item nav__item--dropdown">
            <span class="nav__name heading-title--mini">Movies</span>
            <ul class="nav__item--menu">
                <li class="nav__item--menu-item">
                    <router-link to="/movies">Popular</router-link>
                </li>
                <li class="nav__item--menu-item">
                    <router-link to="/movies/now-playing">Now Playing</router-link>
                </li>
                <li class="nav__item--menu-item">
                    <router-link to="/movies/upcoming">Upcoming</router-link>
                </li>
                <li class="nav__item--menu-item">
                    <router-link to="/movies/top-rated">Top Rated</router-link>
                </li>
            </ul>
        </li>
        <li class="nav__item nav__item--dropdown">
            <span class="nav__name heading-title--mini">TV Shows</span>
            <ul class="nav__item--menu">
                <li class="nav__item--menu-item">
                    <router-link to="/tv-shows">Popular</router-link>
                </li>
                <li class="nav__item--menu-item">
                    <router-link to="/tv-shows/airing-today">Airing Today</router-link>
                </li>
                <li class="nav__item--menu-item">
                    <router-link to="/tv-shows/on-the-air">On TV</router-link>
                </li>
                <li class="nav__item--menu-item">
                    <router-link to="/tv-shows/top-rated">Top Rated</router-link>
                </li>
            </ul>
        </li>
    </ul>
    <ul class="nav__list nav__list--right">
        <li class="nav__item">
            <router-link to="/search" class="nav__name">
                <svg class="nav__name-icon">
                    <use xlink:href="../../assets/sprite.svg#icon-magnifying-glass"></use>
                </svg>
            </router-link>
        </li>
    </ul>
</div>
</template>