import { Fragment, createElement, type CSSProperties, type ElementType } from "react";

/**
 * Splits a heading into words and characters so each glyph can rise from
 * behind a mask, with a small stagger. The technique mirrors the character
 * roll used on the reference site: the real sentence stays available to
 * assistive technology through aria-label, the glyphs are aria-hidden.
 *
 * Arabic is never split per character — doing so breaks the cursive joins and
 * would render the word as isolated letters. Arabic headings animate as a
 * whole instead.
 */
export function Split({
  text,
  as = "span",
  className,
  mode = "scroll",
  step = 16,
  offset = 0,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** "load" animates immediately (above the fold); "scroll" waits for the viewport. */
  mode?: "load" | "scroll";
  step?: number;
  offset?: number;
  id?: string;
}) {
  const isArabic = /[\u0600-\u06FF]/.test(text);

  if (isArabic) {
    return createElement(as, { className, id, "data-split": mode, lang: "ar" }, text);
  }

  const words = text.split(" ");
  let index = 0;

  return createElement(
    as,
    {
      className,
      id,
      "data-split": mode,
      style: { "--step": `${step}ms`, "--offset": `${offset}ms` } as CSSProperties,
    },
    createElement("span", { className: "sr-only", key: "__text" }, text),
    words.map((word, wi) => (
      <Fragment key={`${word}-${wi}`}>
        <span className="split__word" aria-hidden="true">
          {Array.from(word).map((char, ci) => (
            <span className="split__char" key={ci}>
              <span className="split__in" style={{ "--i": index++ } as CSSProperties}>
                {char}
              </span>
            </span>
          ))}
        </span>
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    )),
  );
}
