// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'cgm.codes';
export const SITE_DESCRIPTION = 'Welcome to my website!';


function prefersDarkTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches.toString();
}
