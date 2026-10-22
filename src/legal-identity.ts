/**
 * The publisher's own identity, in one place.
 *
 * Every legal page, the footer and the contact page read from this object, so
 * they can never contradict each other.
 *
 * A `null` value means "not published yet": the line that needs it is dropped
 * from the page instead of being printed as a placeholder. Fill a field and it
 * appears everywhere it is used — nowhere else needs editing.
 *
 * Nothing here is invented. A legal page that displays "raison sociale" is
 * worse than a legal page that displays nothing: the first is an unfinished
 * template, the second is a page waiting for one line of data.
 */
export const LEGAL_IDENTITY: Record<string, string | null> = {
  "raison sociale": null,
  "forme juridique": null,
  adresse: null,
  numéro: null,
  ville: null,
  TVA: null,
  capital: null,
  "nom du responsable": null,
  registrar: null,
  "email de contact RGPD": null,
  téléphone: null,
  "médiateur de la consommation": null,
  "prestataire email": null,
};

/** True when at least one identifying field is still unpublished. */
export function legalIdentityIsPartial(): boolean {
  return Object.values(LEGAL_IDENTITY).some((value) => !value);
}
