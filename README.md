# noise_exposure_notification_tool
Tool to visually show noise sampling results to individual who was sampled.

A web page based on the "Noise Sampling Notification Template" Google Sheet. It compares a measured TWA with the Action Level and Exposure Limit for the selected standard (OSHA 85/90 dBA; NIOSH or ACGIH 82/85 dBA, where 82 dBA is a conservative convention because neither defines an action level) and shows the notification statements and chart from the sheet.

Plain HTML, CSS, and JavaScript with no build step. Open `index.html` in a browser, or deploy the repo as a static site.

- `index.html`: the page
- `calc.js`: the over/under and statement logic, with the sheet cell each piece comes from
- `app.js`: connects the form to the logic and draws the chart (SVG)
- `style.css`: the styles
