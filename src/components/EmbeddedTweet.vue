<template>
    <div :class="getClassName">
        <ClientOnly>
            <Tweet :id="id" />
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