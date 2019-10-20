<template>
    <div class="EmbeddedMultiImage">
        <EmbeddedImage 
            v-for="(img, i) in data" 
            :key="i"
            :src="img.src"
            :alt="img.alt"
            :type="img.type"/>
    </div>
</template>

<script>
import EmbeddedImage from './EmbeddedImage';

export default {
    name: 'EmbeddedMultiImage',
    props: {
        data: {
            type: Array,
            default: [],
        },
    },
    components: {
        EmbeddedImage,
    }
}
</script>