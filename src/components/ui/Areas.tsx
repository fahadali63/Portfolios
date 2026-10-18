/** Numbered areas of expertise (01–06) as inner cards. The numbers mark a real set of six. */
export function Areas({ items }: { items: readonly { title: string; detail: string }[] }) {
  return (
    <ol className="areas">
      {items.map((a, i) => (
        <li key={a.title} className="card">
          <p className="area-num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="t-subhead mt-2 !font-semibold">{a.title}</h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-2">{a.detail}</p>
        </li>
      ))}
    </ol>
  );
}
