<template>
    <div :class="getClassName">
        <ClientOnly>
            <Twitter
                v-if="id"
                :id="id" />
            
            <div
                v-for="id in ids"
                :key="id">
                <Tweet 
                    :id="id"
                    widget-class="EmbeddedTweet_Tweet" />
            </div>
        </ClientOnly>
    </div>
</template>

<script>
import {Tweet} from 'vue-tweet-embed';
import {capitaliseFirstLetter} from '../helpers/utils';

export default {
    name: 'EmbeddedTweet',
    props: {
        id: String,
        ids: Array,
        position: {
            type: String,
            default: 'centre',
        },
    },
    components: {
        Tweet
    },
    computed: {
        getClassName () {
            const baseClass = 'EmbeddedTweet';
            console.log(capitaliseFirstLetter);
            return `${baseClass} ${baseClass}__${capitaliseFirstLetter(this.position)}`
        }
    }
}
</script>