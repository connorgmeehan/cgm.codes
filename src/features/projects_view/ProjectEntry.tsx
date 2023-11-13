import type { CollectionEntry } from "astro:content";
import { createMemo } from "solid-js";

type ProjectEntryProps = CollectionEntry<'p'>;
export function ProjectEntry(props: ProjectEntryProps) {
    const localDate = createMemo(() => {
		return props.data.pubDate.toLocaleDateString('en-us', {
			year: 'numeric',
			month: 'short',
		})
    })

    return <a class="peer group relative flex justify-between items-baseline peer-hover:opacity-50 transition-opacity" href={ `/p/${props.slug}` }>
        <video class="absolute left-1/2 -translate-x-1/2 top-full opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100 transition-all pointer-events-none w-screen max-w-none" src={props.data.heroImage} autoplay muted={true} loop playsinline />

        <span class="z-10">
            {props.data.title}
        </span>

        <span class="z-10">
            {localDate()}
        </span>
    </a>
}
