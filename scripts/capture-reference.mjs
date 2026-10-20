/**
 * Visual forensics for an external reference site, run on a machine that can
 * actually reach it (GitHub Actions). Chromium here has no outbound network.
 *
 * Produces, under reference/:
 *   desktop|tablet|mobile-hero.png      first viewport
 *   desktop|tablet|mobile-full.png      full page after scrolling every reveal
 *   desktop|tablet|mobile-sections/     one crop per top-level section
 *   desktop|tablet|mobile-styles.json   computed styles, palette, type, layout
 *   css/                                every stylesheet the page loaded
 *   menu-*.png                          navigation open, where a menu exists
 *
 * Nothing here is copied into the product: it is measurement material only.
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const TARGET = process.env.TARGET_URL || "https://legencymedia.com/";
const OUT = path.resolve("reference");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "tablet", width: 768, height: 1024, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];

const rgb = (s) => s;

async function collect(page) {
  return page.evaluate(() => {
    const px = (v) => (v ? Math.round(parseFloat(v) * 100) / 100 : 0);
    const r = (el) => {
      const b = el.getBoundingClientRect();
      return {
        x: Math.round(b.x + scrollX),
        y: Math.round(b.y + scrollY),
        w: Math.round(b.width),
        h: Math.round(b.height),
      };
    };
    const style = (el) => {
      const c = getComputedStyle(el);
      return {
        fontFamily: c.fontFamily,
        fontSize: c.fontSize,
        fontWeight: c.fontWeight,
        lineHeight: c.lineHeight,
        letterSpacing: c.letterSpacing,
        textTransform: c.textTransform,
        textAlign: c.textAlign,
        color: c.color,
        background: c.backgroundColor,
        backgroundImage: c.backgroundImage === "none" ? "none" : "set",
        borderTop: `${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor}`,
        borderRadius: c.borderRadius,
        padding: c.padding,
        margin: c.margin,
        maxWidth: c.maxWidth,
        display: c.display,
        gap: c.gap,
        transition: c.transitionProperty === "all" ? `all ${c.transitionDuration}` : `${c.transitionProperty} ${c.transitionDuration} ${c.transitionTimingFunction}`,
      };
    };

    // --- palette: every element's colour, counted ---
    const fg = new Map();
    const bg = new Map();
    for (const el of document.querySelectorAll("body *")) {
      const c = getComputedStyle(el);
      const b = c.backgroundColor;
      if (b && b !== "rgba(0, 0, 0, 0)" && !b.startsWith("rgba(0, 0, 0, 0")) {
        bg.set(b, (bg.get(b) || 0) + 1);
      }
      const f = c.color;
      if (f) fg.set(f, (fg.get(f) || 0) + 1);
    }
    const top = (m) =>
      [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([value, count]) => ({ value, count }));

    // --- fonts actually rendered ---
    const faces = [];
    const fonts = new Map();
    for (const el of document.querySelectorAll("body *")) {
      const c = getComputedStyle(el);
      fonts.set(`${c.fontFamily} | ${c.fontWeight}`, (fonts.get(`${c.fontFamily} | ${c.fontWeight}`) || 0) + 1);
    }
    try {
      for (const sheet of document.styleSheets) {
        let rules = [];
        try {
          rules = sheet.cssRules;
        } catch {
          continue;
        }
        for (const rule of rules) {
          if (rule.constructor.name === "CSSFontFaceRule") {
            faces.push({
              family: rule.style.getPropertyValue("font-family"),
              weight: rule.style.getPropertyValue("font-weight"),
              style: rule.style.getPropertyValue("font-style"),
              src: rule.style.getPropertyValue("src").slice(0, 220),
            });
          }
        }
      }
    } catch {}

    // --- custom properties ---
    const custom = {};
    const root = getComputedStyle(document.documentElement);
    for (const name of root) {
      if (name.startsWith("--")) custom[name] = root.getPropertyValue(name).trim();
    }

    // --- type specimens ---
    const pick = (sel) => [...document.querySelectorAll(sel)].filter((e) => e.offsetHeight > 0).slice(0, 6);
    const specimens = {};
    for (const sel of ["h1", "h2", "h3", "h4", "p", "a", "button", "nav a", "li", "figcaption", "blockquote"]) {
      const els = pick(sel);
      if (!els.length) continue;
      specimens[sel] = els.map((el) => ({
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 70),
        cls: el.className && typeof el.className === "string" ? el.className.slice(0, 90) : "",
        rect: r(el),
        ...style(el),
      }));
    }

    // --- section map ---
    const main = document.querySelector("main") || document.body;
    const sectionEls = [...main.children].filter((e) => e.offsetHeight > 40);
    const sections = sectionEls.map((el, i) => {
      const c = getComputedStyle(el);
      const heads = [...el.querySelectorAll("h1,h2,h3")].slice(0, 2).map((h) => ({
        tag: h.tagName,
        text: (h.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
        size: getComputedStyle(h).fontSize,
        weight: getComputedStyle(h).fontWeight,
        lh: getComputedStyle(h).lineHeight,
      }));
      return {
        i,
        tag: el.tagName,
        cls: typeof el.className === "string" ? el.className.slice(0, 100) : "",
        rect: r(el),
        bg: c.backgroundColor,
        bgImage: c.backgroundImage === "none" ? "none" : "set",
        padding: c.padding,
        gap: c.gap,
        display: c.display,
        heads,
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 180),
      };
    });

    // --- layout containers ---
    const containers = [...document.querySelectorAll("main > *, body > * > *, header, footer, nav")].slice(0, 24).map((el) => ({
      tag: el.tagName,
      cls: typeof el.className === "string" ? el.className.slice(0, 80) : "",
      rect: r(el),
      maxWidth: getComputedStyle(el).maxWidth,
      padding: getComputedStyle(el).padding,
    }));

    // --- motion ---
    const animated = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const c = getComputedStyle(el);
        return c.transitionDuration !== "0s" || c.animationName !== "none";
      })
      .slice(0, 40)
      .map((el) => ({
        tag: el.tagName,
        cls: typeof el.className === "string" ? el.className.slice(0, 70) : "",
        transition: getComputedStyle(el).transition,
        animation: getComputedStyle(el).animation,
      }));

    return {
      url: location.href,
      title: document.title,
      lang: document.documentElement.lang,
      viewport: { w: innerWidth, h: innerHeight },
      page: { height: document.body.scrollHeight, width: document.body.scrollWidth },
      palette: { backgrounds: top(bg), colors: top(fg) },
      fonts: {
        faces,
        used: [...fonts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([value, count]) => ({ value, count })),
        loaded: [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.style} ${f.status}`).slice(0, 24),
      },
      customProperties: custom,
      specimens,
      sections,
      containers,
      motion: { animatedCount: document.getAnimations().length, animated },
      stylesheets: [...document.styleSheets].map((s) => s.href).filter(Boolean),
      images: [...document.images].slice(0, 30).map((img) => ({
        src: img.currentSrc.slice(0, 200),
        alt: img.alt.slice(0, 60),
        rect: { w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height) },
        fit: getComputedStyle(img).objectFit,
        radius: getComputedStyle(img).borderRadius,
      })),
    };
  });
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(path.join(OUT, "css"), { recursive: true });

  const browser = await chromium.launch({ args: ["--disable-blink-features=AutomationControlled"] });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      userAgent: UA,
      locale: "en-GB",
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));

    await page.goto(TARGET, { waitUntil: "networkidle", timeout: 90_000 }).catch((e) => errors.push(`goto: ${e.message}`));
    await page.waitForTimeout(3500);

    // Cookie banners / overlays, if any, are left visible: they are part of the page.
    await page.screenshot({ path: path.join(OUT, `${vp.name}-hero.png`) });

    // Walk the page so scroll-triggered reveals fire, then return to the top.
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += Math.round(vp.height * 0.75)) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(350);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);

    await page.screenshot({ path: path.join(OUT, `${vp.name}-full.png`), fullPage: true });

    // One crop per top-level section.
    const dir = path.join(OUT, `${vp.name}-sections`);
    await fs.mkdir(dir, { recursive: true });
    const kids = await page.evaluate(() =>
      [...((document.querySelector("main") || document.body).children)]
        .map((el, i) => ({ i, h: el.offsetHeight }))
        .filter((s) => s.h > 60)
        .map((s) => s.i),
    );
    for (const i of kids.slice(0, 30)) {
      const handle = await page.evaluateHandle((idx) => [...((document.querySelector("main") || document.body).children)][idx], i);
      const el = handle.asElement();
      if (!el) continue;
      await el.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(400);
      await el.screenshot({ path: path.join(dir, `${String(i).padStart(2, "0")}.png`) }).catch(() => {});
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const data = await collect(page);
    data.errors = errors.slice(0, 6);
    await fs.writeFile(path.join(OUT, `${vp.name}-styles.json`), JSON.stringify(data, null, 2));

    // Stylesheets: fetch the raw CSS through the browser context (no CORS limit).
    if (vp.name === "desktop") {
      for (const href of data.stylesheets.slice(0, 12)) {
        try {
          const res = await ctx.request.get(href, { timeout: 30_000 });
          const body = await res.text();
          const name = href.split("/").pop().split("?")[0].slice(0, 60) || "sheet.css";
          await fs.writeFile(path.join(OUT, "css", name), body);
        } catch {}
      }

      // Hover states and the navigation overlay, where they exist.
      const hoverTargets = ["a", "button", "nav a"];
      for (const sel of hoverTargets) {
        const el = page.locator(sel).first();
        if (await el.count()) {
          await el.hover().catch(() => {});
          await page.waitForTimeout(600);
          await page.screenshot({ path: path.join(OUT, `hover-${sel.replace(/\s+/g, "-")}.png`) }).catch(() => {});
        }
      }
      const menu = page.getByRole("button", { name: /menu/i }).first();
      if (await menu.count()) {
        await menu.click().catch(() => {});
        await page.waitForTimeout(1200);
        await page.screenshot({ path: path.join(OUT, "menu-open.png") });
        const menuData = await collect(page);
        await fs.writeFile(path.join(OUT, "menu-styles.json"), JSON.stringify(menuData, null, 2));
      }
    }

    console.log(`${vp.name}: ${data.page.height}px tall, ${data.sections.length} sections`);
    await ctx.close();
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
