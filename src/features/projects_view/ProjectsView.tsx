import type { CollectionEntry } from "astro:content"
import { ProjectsFilter } from "./ProjectsFilter"
import { For, createMemo, createSignal } from "solid-js"
import { ProjectEntry } from "./ProjectEntry";

type ProjectsViewProps = {
    collection: CollectionEntry<'p'>[],
}
export function ProjectsView(props: ProjectsViewProps) {
    const allTags = createMemo<Array<string>>(() => {
        const allTags = props.collection.flatMap(entry => entry.data.tags ?? []);
        return [...new Set(allTags)];
    });
    const [currentFilters, setCurrentFilters] = createSignal<string[]>([]);

    const visibleProjects = createMemo(() => {
        if (currentFilters().length === 0) return props.collection;

        return props.collection.filter(entry => {
            return entry.data.tags.some(tag => currentFilters().includes(tag));
        })
    })

    return <div class="flex flex-col items-stretch gap-4">
        <div class="flex justify-between mb-4">
            <h3 class="text-2xl font-semibold">Projects</h3>
            <ProjectsFilter currentFilters={currentFilters()} onFilterStateChange={(t) => setCurrentFilters(t)} allFilters={allTags()} />
        </div>
        <For each={visibleProjects()}>
            {(entry) => {
                return <ProjectEntry {...entry} />;
            }}
        </For>
    </div>
}
