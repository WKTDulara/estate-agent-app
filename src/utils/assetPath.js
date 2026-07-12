/**
 * Resolves a path stored in properties.json (e.g. "images/prop1/pic1.svg")
 * into a correct, absolute URL.
 *
 * This matters because property images are referenced with plain relative
 * paths, and the app is a client-side-routed SPA — on a nested route like
 * /properties/prop1, the browser would otherwise resolve a relative path
 * against the current URL (giving /properties/images/prop1/pic1.svg, which
 * doesn't exist) instead of the site root. Prepending Vite's BASE_URL also
 * keeps this correct when deployed under a sub-path, e.g. GitHub Pages'
 * /estate-agent-app/.
 */
export function assetPath(path) {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\//, "");
  return `${cleanBase}${cleanPath}`;
}
