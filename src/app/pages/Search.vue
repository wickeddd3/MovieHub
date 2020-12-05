<template>
<div class="container-fluid">
    <div class="search">
        <div class="search__bar">
            <form @submit.prevent="search">
                <button type="submit" class="search__bar-btn search__bar-btn--left">
                    <svg class="search__bar-icon">
                        <use xlink:href="../../assets/sprite.svg#icon-magnifying-glass"></use>
                    </svg>
                </button>
                <input type="text" v-model="search_input" class="search__bar-input" placeholder="Search for a movie, tv show, person...">
                <button type="submit" class="search__bar-btn search__bar-btn--right" @click="search_input = ''">
                    <svg class="search__bar-icon">
                        <use xlink:href="../../assets/sprite.svg#icon-erase"></use>
                    </svg>
                </button>
            </form>
        </div>
        <div class="search__main">
            <p class="paragraph m-b-1" v-if="search_result.length > 0">
                There are <span class="heading-secondary">{{ total_pages }}</span> page results for query "<span class="heading-secondary">{{ search_input }}</span>"
            </p>
            <div class="container__row">
                <div class="container__col-sm-12 container__col-lg-3 container__col-xl-3">
                    <div class="search__main__sidebar">
                        <div class="search__main__sidebar__header">
                            Search Result Summary
                        </div>
                        <ul class="list-group">
                            <li :class="{'list-group__item': true, 'list-group__item--active': mediaTypeActive('movie')}" @click="media_type_active='movie'">
                                <a href="#" class="list-group__item__link">Movies</a>
                                <span :class="{'badge': true, 'badge--primary': mediaTypeActive('movie')}">{{ mediaTypeTotal('movie') }}</span>
                            </li>
                            <li :class="{'list-group__item': true, 'list-group__item--active': mediaTypeActive('tv')}"  @click="media_type_active='tv'">
                                <a href="#" class="list-group__item__link">TV Shows</a>
                                <span :class="{'badge': true, 'badge--primary': mediaTypeActive('tv')}">{{ mediaTypeTotal('tv') }}</span>
                            </li>
                            <li :class="{'list-group__item': true, 'list-group__item--active': mediaTypeActive('person')}" @click="media_type_active='person'">
                                <a href="#" class="list-group__item__link">People</a>
                                <span :class="{'badge': true, 'badge--primary': mediaTypeActive('person')}">{{ mediaTypeTotal('person') }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="container__col-sm-12 container__col-lg-9 container__col-xl-9">
                    <div class="search__main__content">
                        <template v-if="filteredResult.length > 0">
                            <template v-for="(result, index) in filteredResult">
                                <MovieMedia :key="index" :movie="result" :media_type="'search'" />
                            </template>
                        </template>
                        <template v-else>
                            <p class="paragraph">{{ no_result }}</p>
                        </template>
                        <div class="pagination" v-if="filteredResult.length > 0">
                            <button class="pagination__previous btn" @click="previous">Previous</button>
                            <span class="pagination__page">{{ page }} of {{ total_pages }}</span>
                            <button class="pagination__next btn" @click="next">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import MovieMedia from '@/app/components/MovieMedia';
import Footer from '@/app/layouts/Footer';
import dateFormat from '@/app/mixins/dateFormat';

export default {
    components: {
        MovieMedia,
        Footer
    },

    mixins:[dateFormat],

    data() {
        return {
            search_input:"",
            search_result:[],
            summarized_result:[],
            media_type_active:"",
            page:1,
            total_pages:1,
            no_result:""
        }
    },

    created() {
        if(this.$route.params.query){ 
            this.search_input = this.$route.params.query;
            this.search();
        }
    },

    computed: {
        filteredResult() {
            if(this.media_type_active != ""){
                return this.search_result.filter((result) => {
                    return result.media_type == this.media_type_active;
                });
            } else {
                return this.search_result;
            }
        }
    },

    methods: {
        search() {
            history.pushState(null, null, '?query='+this.search_input);
            this.$movie.get(`/3/search/multi?query=${this.search_input}&language=en-US&page=${this.page}`)
                .then((res) => {
                    this.search_result = res.data.results;
                    this.summarized_result = this.summarizeResults(this.search_result);
                    this.page = res.data.page;
                    this.total_pages = res.data.total_pages;
                    if(this.search_result.length === 0) {
                        this.no_result = "The are no search result that matched your query.";
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                })
        },
        summarizeResults(results) {
            let resultSummary = [];
            results.forEach((result) => {
                let summaryTypeIndex = resultSummary.findIndex((summary) => { return summary.media_type === result.media_type });
                if(summaryTypeIndex >= 0) {
                    resultSummary[summaryTypeIndex].total+=1;
                } else {
                    resultSummary.push({
                        media_type:result.media_type,
                        total: 1
                    });
                }
            });
            return resultSummary;
        },
        mediaTypeTotal(media_type) {
            let summary = this.summarized_result.find((summary) => { return summary.media_type == media_type; });
            return (summary) ? summary.total : 0;
        },
        mediaTypeActive(media_type) {
            return (media_type == this.media_type_active) ? true : false;
        },
        previous() {
            if(this.page > 1) {
                this.page--;
                this.search();
            }
        },
        next() {
            if(this.page < this.total_pages) {
                this.page++;
                this.search();
            }
        }
    }
}
</script>