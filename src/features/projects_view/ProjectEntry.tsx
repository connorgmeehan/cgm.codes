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

    return <a class="group relative flex justify-between items-baseline peer-hover:opacity-50 transition-opacity" href={ `/p/${props.slug}` }>
        <span class="z-10 group-hover:underline ">
            {props.data.title}
        </span>

        <span class="z-10 group-hover:underline">
            {localDate()}
        </span>
    </a>
}
