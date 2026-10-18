import { ChevronDown } from "lucide-react";
import { attainment, pctOfTarget } from "@/content/metrics";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const summary = () =>
  `${attainment.title}, ${attainment.period}: ` + attainment.months.map((m) => `${m.month} ${pctOfTarget(m)}% (${usd(m.locked)} of ${usd(m.target)})`).join("; ");

/**
 * Monthly attainment, Jul–Dec 2025: one series (coral marks), values on the caps in text colour,
 * dashed 100% target line. "full" adds month labels, hover tooltips and a table view.
 */
export function AttainmentChart({ variant = "full", id = "attainment" }: { variant?: "full" | "mini"; id?: string }) {
  const months = attainment.months.map((m) => ({ ...m, pct: pctOfTarget(m) }));
  if (variant === "mini") {
    return (
      <div role="img" aria-label={summary()} data-track="business">
        <div className="chart chart-mini">
          <div className="chart-target" aria-hidden="true" />
          {months.map((m) => (
            <div key={m.month} className="chart-col" style={{ ["--v" as string]: m.pct }}>
              <div className="chart-bar" />
            </div>
          ))}
        </div>
        <div className="chart-months t-meta" aria-hidden="true">
          {months.map((m) => (
            <span key={m.month}>{m.month[0]}</span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <figure className="m-0" aria-labelledby={`${id}-title`}>
      <figcaption className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <span>
          <span id={`${id}-title`} className="t-heading block">
            {attainment.title}
          </span>
          <span className="t-meta block">
            % of monthly target · {attainment.period} · {attainment.currency} · {attainment.sourceLabel}
          </span>
        </span>
      </figcaption>
      <div role="img" aria-label={summary()}>
        <div className="chart" style={{ ["--h" as string]: "240px" }}>
          <div className="chart-target" aria-hidden="true">
            <span>Target 100%</span>
          </div>
          {months.map((m) => (
            <div key={m.month} className="chart-col" style={{ ["--v" as string]: m.pct }} aria-hidden="true">
              <span className="chart-tip">
                {usd(m.locked)} of {usd(m.target)}
              </span>
              <span className="chart-cap">{m.pct}%</span>
              <div className="chart-bar" />
            </div>
          ))}
        </div>
        <div className="chart-months t-meta" aria-hidden="true">
          {months.map((m) => (
            <span key={m.month}>{m.month}</span>
          ))}
        </div>
      </div>
      <details className="mt-6">
        <summary className="btn btn-sm btn-glass inline-flex">
          Show the numbers as a table <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="data-table">
            <caption className="sr-only">
              {attainment.title}, {attainment.period}
            </caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Target</th>
                <th scope="col">Locked</th>
                <th scope="col">% of target</th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => (
                <tr key={m.month}>
                  <th scope="row" className="font-normal">
                    {m.month} 2025
                  </th>
                  <td>{usd(m.target)}</td>
                  <td>{usd(m.locked)}</td>
                  <td>{m.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
