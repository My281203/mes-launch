/**
 * Colour concept switch.
 *
 * Change ACTIVE_THEME to re-skin the whole page. Every accent and every blue-tinted neutral in
 * globals.css is an hsl() driven by the variables below, so nothing else needs editing.
 * To try a theme without touching code, open the page with ?theme=red or ?theme=blue.
 *
 *   blue  Blue / Black  (the original look)  electric blue accent on near-black and cool off-white
 *   red   Red / White   crimson accent on warm white, with deep warm-black chapters
 *
 * To add a concept, add a [data-theme="..."] block in globals.css (search "Colour concepts")
 * and register its name here.
 */
export const THEMES = ['blue', 'red'] as const
export type ThemeName = (typeof THEMES)[number]

export const ACTIVE_THEME: ThemeName = 'red'
