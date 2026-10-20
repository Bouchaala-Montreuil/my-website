// ─── Integration boundary ───────────────────────────────────────────────────
// Every external endpoint of the site lives here. Values are public identifiers,
// never secrets: they are safe to ship in the client bundle.
export const SITE_URL = "https://feekza.com";
export const CONTACT_EMAIL = "hello@feekza.com";
// Formspree form used by the brief / contact form.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoejbykw";
// Stripe payment link for the first month.
// Documented caveat: this link currently charges in USD ($227.84/month on
// 2026-10-20) with a 4 % conversion fee, while the offer is priced in euros.
// The brief form therefore offers a euro payment link as the default path.
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/14A3cv0gfbW59zE5Y91oI00";
export const STRIPE_CHARGES_USD = true;
export const OFFER_AMOUNT_EUR = 195;
export const RESPONSE_TIME = "1 jour ouvré";
