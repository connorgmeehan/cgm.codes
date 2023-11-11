import clsx from 'clsx';
import { Show, createSignal } from 'solid-js';
import { Overlay } from './Overlay';

import { type GetImageResult } from 'astro';

type GalleryImageProps = {
    image: GetImageResult,
    alt: string,
    class?: string,
}
export default function GalleryImage(props: GalleryImageProps) {
    const [open, setOpen] = createSignal(false);
    return <div class={clsx(props.class)}>
        <img class="cursor-pointer" src={props.image.src} onClick={() => setOpen(true)} alt={props.alt}>
        </img>
        <Show when={open()}>
            <Overlay onClose={() => setOpen(false)}>
                <div class="relative max-w-[100vw] max-h-[100vh]">
                    <button class="absolute top-4 right-4">
                        Close
                    </button>
                    <img src={props.image.src} alt={props.alt}/>
                </div>
            </Overlay>
        </Show>
    </div>
}
