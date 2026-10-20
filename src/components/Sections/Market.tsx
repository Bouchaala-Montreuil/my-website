import type { Content } from "@/content/types";
import { SectionHead } from "../SectionHead";

export function Market({ c }: { c: Content }) {
  return (
    <section className="section" id="comparatif" aria-labelledby="comparatif-titre">
      <div className="wrap">
        <SectionHead head={c.market.head} id="comparatif-titre" />

        <div
          className="table-scroll mt-4"
          role="region"
          aria-label={c.market.caption}
          tabIndex={0}
        >
          <table className="compare">
            <caption>{c.market.caption}</caption>
            <thead>
              <tr>
                {c.market.columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.market.rows.map((row) => (
                <tr key={row.label} className={row.highlight ? "feekza" : undefined}>
                  <th scope="row">{row.label}</th>
                  {row.cells.map((cell, index) => (
                    <td key={`${row.label}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid" style={{ marginTop: ".9rem" }}>
          <p className="sources">
            <strong>{c.market.sourcesLabel} : </strong>
            {c.market.sources.map((source, index) => (
              <span key={source.href}>
                {index > 0 ? " · " : ""}
                <a href={source.href} target="_blank" rel="noreferrer noopener">
                  {source.text}
                </a>
              </span>
            ))}
          </p>
        </div>

        <p className="callout">{c.market.callout}</p>
      </div>
    </section>
  );
}
