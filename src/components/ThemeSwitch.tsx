import { createEffect, createSignal } from 'solid-js';

export function getPreferredTheme() {
    if (import.meta.env.SSR) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createLocalStorageSignal<T extends string>(key: string, initialValue: T) {
    const v = import.meta.env.SSR ? initialValue : window.localStorage.getItem(key) as T ?? initialValue;
    const signal = createSignal(v);
    const [value] = signal;
    createEffect(() => {
        window.localStorage.setItem(key, value());
    });
    return signal;
}

export function createThemeToggle() {
    const [theme, setTheme] = createLocalStorageSignal<'dark'|'light'>('site-theme', getPreferredTheme());

    createEffect(() => {
        console.log('theme changed: ', theme());
        if (theme() === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    })

    const toggle = () => {
        if (theme() === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }
    const reset = () => {
        setTheme(getPreferredTheme());
    }

    return [theme, {
        toggle,
        reset,
    }] as const;
}

export default function ThemeSwitch() {
    const [theme, { toggle, reset }] = createThemeToggle();

    return (<button
            class="theme-toggle"
            classList={{
                'dark': theme() === 'dark',
            }}
            type="button"
            title="Toggle theme"
            aria-label="Toggle theme"
            onClick={toggle}
            onAuxClick={reset}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width="1em"
                height="1em"
                fill="currentColor"
                class="theme-toggle__around"
                viewBox="0 0 32 32"
                >
                <clipPath id="theme-toggle__around__cutout">
                    <path d="M0 0h42v30a1 1 0 00-16 13H0Z" />
                </clipPath>
                <g>
                    <circle cx="16" cy="16" r="7.4"  />
                    <g class='transition-all' classList={{
                            'scale-0': theme() === 'dark',
                        }}>
                        <circle cx="16" cy="3.3" r="2.3" />
                        <circle cx="27" cy="9.7" r="2.3" />
                        <circle cx="27" cy="22.3" r="2.3" />
                        <circle cx="16" cy="28.7" r="2.3" />
                        <circle cx="5" cy="22.3" r="2.3" />
                        <circle cx="5" cy="9.7" r="2.3" />
                    </g>
                </g>
            </svg>
        </button>
    )
}
