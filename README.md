# noise_exposure_notification_tool
Tool to visually show noise sampling results to individual who was sampled.

A web page based on the "Noise Sampling Notification Template" Google Sheet. The user enters the Measured Lavg (the full-shift average from the dosimeter), the shift length and the standard. The page calculates the 8-hour TWA as Lavg + factor x log10(shift hours / 8), with factor 16.61 for OSHA (5 dB exchange rate) and 10 for NIOSH or ACGIH (3 dB), rounded to one decimal. It compares that TWA with the Action Level and Exposure Limit for the standard (OSHA 85/90 dBA; NIOSH or ACGIH 82/85 dBA, where 82 dBA is a conservative convention because neither defines an action level) and shows the notification statements and chart from the sheet.

Plain HTML, CSS, and JavaScript with no build step. Open `index.html` in a browser, or deploy the repo as a static site.

- `index.html`: the page
- `calc.js`: the over/under and statement logic, with the sheet cell each piece comes from
- `app.js`: connects the form to the logic and draws the chart (SVG)
- `style.css`: the styles
- `disclaimer.css`, `disclaimer.js`: the first-visit disclaimer gate (agreement is saved in localStorage as `oems_disclaimer_v1`)
