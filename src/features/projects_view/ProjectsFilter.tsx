import { For } from "solid-js";

type ProjectsFilterProps = {
    allFilters: string[];
    currentFilters: string[];
    onFilterStateChange: (newFilters: string[]) => void;
}
export function ProjectsFilter(props: ProjectsFilterProps) {

    const handleClick = (tag: string) => {
        if (props.currentFilters.includes(tag)) {
            props.onFilterStateChange(props.currentFilters.filter(t => t !== tag));
        } else {
            props.onFilterStateChange([...props.currentFilters, tag]);
        }
    }

    return <div class="flex justify-center gap-4">
        <For each={props.allFilters}>
            {(tag) => (
            <div 
                class="rounded-xl px-4 cursor-pointer outline outline-gray-300 outline-1 hover:outline-offset-2" 
                classList={{
                    'bg-gray-200': props.currentFilters.includes(tag),
                }}
                onClick={() => handleClick(tag)}
                >
                    {tag}
            </div>
            )}
        </For>
    </div>
}
