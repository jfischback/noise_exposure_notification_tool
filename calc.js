// Logic from the "Notification" tab of the Noise Sampling Notification Template sheet.
// Cell references are noted on each piece.

const ACTION_LEVEL = 82;   // B16
const EXPOSURE_LIMIT = 85; // C16

// twa is a number, or "" when Measured TWA (C10) is blank.
function calculate(twa) {
  // D16: =IF($C$10="","",$C$10)
  const yourExposure = twa === "" ? "" : twa;
  const blank = yourExposure === "";

  // B19: =IF($D$16="","",IF($D$16>=B16,"OVER","UNDER"))
  const actionResult = blank ? "" : yourExposure >= ACTION_LEVEL ? "OVER" : "UNDER";
  // C19: =IF($D$16="","",IF($D$16>=C16,"OVER","UNDER"))
  const limitResult = blank ? "" : yourExposure >= EXPOSURE_LIMIT ? "OVER" : "UNDER";

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

  return { yourExposure, actionResult, limitResult, statements, chartValue };
}

if (typeof module !== "undefined") module.exports = { calculate, ACTION_LEVEL, EXPOSURE_LIMIT };
