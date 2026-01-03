/**
 * ignition.ts
 *
 * Energy-based pyrotechnic ignition timing calculation.
 * Client-side reference for GitHub Pages.
 *
 * Educational and exploratory use only.
 */

export function ignitionTimeMin(
  E_req: number,   // Joules
  V_oc: number,    // Volts
  R_ign: number,   // Ohms
  R_wire: number,  // Ohms
  R_bat: number,   // Ohms
  R_mos: number    // Ohms
): number {

  if (E_req <= 0 || V_oc <= 0 || R_ign <= 0) {
    return 0;
  }

  const R_total =
    R_ign +
    R_wire +
    R_bat +
    R_mos;

  if (R_total <= 0) {
    return 0;
  }

  return (E_req * R_total * R_total) /
         (V_oc * V_oc * R_ign);
}

export function ignitionTimeFire(
  t_min: number,
  safetyFactor: number
): number {

  if (t_min <= 0 || safetyFactor <= 0) {
    return 0;
  }

  return t_min * safetyFactor;
}