import { environmentFor } from "@/content/environments";
import { media } from "@/content/media";

/**
 * The generated map behind everything (decorative, alt=""). One picture per appearance; CSS shows the one
 * matching <html data-theme> (or the system setting). Phones get a pre-softened version and no backdrop-filter.
 */
export function Environment({ route }: { route: string }) {
  const env = environmentFor(route);
  return (
    <>
      {(["dark", "light"] as const).map((theme) => {
        const desktop = media(`${env.image}-${theme}-desktop`);
        const mobile = media(`${env.image}-${theme}-mobile`);
        return (
          <div key={theme} className={`env env-${theme}`} aria-hidden="true">
            <link rel="preload" as="image" href={desktop.avif} type="image/avif" media={`(min-width: 768px) and (prefers-color-scheme: ${theme})`} fetchPriority="high" />
            <picture>
              <source media="(max-width: 767px)" srcSet={mobile.avif} type="image/avif" />
              <source media="(max-width: 767px)" srcSet={mobile.src} type="image/webp" />
              <source srcSet={desktop.avif} type="image/avif" />
              <img src={desktop.src} width={desktop.width} height={desktop.height} alt="" decoding="async" fetchPriority={theme === "dark" ? "high" : "low"} />
            </picture>
          </div>
        );
      })}
    </>
  );
}
