<template>
    <div :class="{ 
        EmbeddedImage: true,
        EmbeddedImage__HalfWidth: type == 'halfwidth',
        EmbeddedImage__FullWidth: type == 'fullwidth',
        EmbeddedImage__Open: isOpen,
        EmbeddedImage__Closed: !isOpen
    }"  v-on:click="openClose">
        <div class="EmbeddedImage_ImageWrapper">
            <g-image class="EmbeddedImage_Image" :src="src" :alt="alt" />
        </div>
    </div>
</template>

<script>
import {capitaliseFirstLetter} from '../helpers/utils';
const baseClass = 'EmbeddedImage';

export default {
    name: 'EmbeddedImage',
    props: {
        src: {
            type: String,
            required: true,
            default: '',
        },
        type: {
            type: String,
            validator: (prop) => [
                'fullwidth',
                'halfwidth',
            ].includes(prop),
        },
        alt: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        isOpen: false,
    }),
    methods: {
        openClose: function() {
            console.log(baseClass);
            console.log(this.getTypeModifier());
            console.log(this.getOpenModifier());
            this.isOpen = !this.isOpen
        },
        getTypeModifier: function() { return `${baseClass}__${capitaliseFirstLetter(this.type)}` },
        getOpenModifier: function() { return this.isOpen
            ? `${baseClass}__Open`
            : `${baseClass}__Closed`
        },
    },
    computed: {
        wrapperClass: function() { 
            console.log(baseClass);
            console.log(this.getTypeModifier());
            console.log(this.getOpenModifier());
            return `${baseClass} ${this.getOpenModifier()} ${this.getTypeModifier()}` },

    }
}
</script>