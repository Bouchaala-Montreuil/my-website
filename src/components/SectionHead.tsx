import type { SectionHead as SectionHeadData } from "@/content/types";
import { Split } from "./Split";

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
    <div className="sec-head" data-reveal>
      <p className="sec-head__num">
        <b aria-hidden="true">{head.num}</b>
        <span>{head.label}</span>
      </p>
      <Split as={Tag} text={head.title} mode="scroll" step={11} className="sec-head__title" id={id} />
      {head.note ? <p className="sec-head__note">{head.note}</p> : <span aria-hidden="true" />}
    </div>
  );
}
