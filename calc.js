// Logic from the "Notification" tab of the Noise Sampling Notification Template sheet.
// Cell references are noted on each piece.

// Action Level (B16) and Exposure Limit (C16) for each standard.
// OSHA 29 CFR 1910.95: 85 dBA action level, 90 dBA PEL.
// NIOSH (REL) and ACGIH (TLV) define no action level; 82 dBA is the sheet's
// conservative convention (50 percent dose at a 3 dB exchange rate).
const LIMITS = {
  OSHA: { actionLevel: 85, exposureLimit: 90 },
  NIOSH: { actionLevel: 82, exposureLimit: 85 },
  ACGIH: { actionLevel: 82, exposureLimit: 85 },
};

const NO_ACTION_LEVEL_NOTE =
  "NIOSH and ACGIH define no action level. An action level of 82 dBA, the 50 percent dose point at a 3 dB exchange rate, is applied here as a conservative convention for enrolling workers in a hearing conservation program. " +
  "Applying this action level is optional and serves only as an added margin of safety for employees. " +
  "NIOSH and ACGIH limits are recommendations, not OSHA regulations, so not applying the 82 dBA action level does not by itself violate OSHA requirements. " +
  "Check any company policy or contract that may require it.";

// twa is a number, or "" when Measured TWA (C10) is blank.
function calculate(twa, standard) {
  const { actionLevel, exposureLimit } = LIMITS[standard];

  // D16: =IF($C$10="","",$C$10)
  const yourExposure = twa === "" ? "" : twa;
  const blank = yourExposure === "";

  // B19: =IF($D$16="","",IF($D$16>=B16,"OVER","UNDER"))
  const actionResult = blank ? "" : yourExposure >= actionLevel ? "OVER" : "UNDER";
  // C19: =IF($D$16="","",IF($D$16>=C16,"OVER","UNDER"))
  const limitResult = blank ? "" : yourExposure >= exposureLimit ? "OVER" : "UNDER";

  const statements = blank
    ? ["Enter the Measured TWA above to complete this notification."] // B21
    : [
        "1. You are " + actionResult + " the Action Level.", // B21
        actionResult === "OVER" // B23
          ? "2. You DO need to be enrolled in Hearing Conservation."
          : "2. You DO NOT need to be enrolled in Hearing Conservation.",
        "3. You are " + limitResult + " the Noise Exposure Limit.", // B25
        limitResult === "OVER" // B27
          ? "4. You ARE required to wear hearing protection."
          : "4. You ARE NOT required to wear hearing protection.",
      ];

  // Chart Data!B3: =N(Notification!$D$16), so blank charts as 0.
  const chartValue = blank ? 0 : yourExposure;

  const note = standard === "OSHA" ? "" : NO_ACTION_LEVEL_NOTE;

  return { actionLevel, exposureLimit, yourExposure, actionResult, limitResult, statements, chartValue, note };
}

if (typeof module !== "undefined") module.exports = { calculate, LIMITS, NO_ACTION_LEVEL_NOTE };
