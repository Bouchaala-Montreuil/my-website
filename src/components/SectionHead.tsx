import type { SectionHead as SectionHeadData } from "@/content/types";

export function SectionHead({
  head,
  id,
  as: Tag = "h2",
}: {
  head: SectionHeadData;
  id: string;
  as?: "h2";
}) {
  return (
    <div className="sec-head">
      <p className="sec-head__num">
        <b aria-hidden="true">{head.num}</b>
        <span>{head.label}</span>
      </p>
      <Tag id={id}>{head.title}</Tag>
      {head.note ? <p className="sec-head__note">{head.note}</p> : <span aria-hidden="true" />}
    </div>
  );
}
