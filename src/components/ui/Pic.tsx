import { media } from "@/content/media";

/** An image built by `npm run media`: AVIF with WebP fallback, exact width/height (no layout shift). */
export function Pic({
  id,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes,
}: {
  id: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const m = media(id);
  return (
    <picture className={className}>
      <source srcSet={m.avif} type="image/avif" sizes={sizes} />
      <img
        src={m.src}
        width={m.width}
        height={m.height}
        alt={alt}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
