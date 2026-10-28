# noise_exposure_notification_tool
Tool to visually show noise sampling results to individual who was sampled.

A web page based on the "Noise Sampling Notification Template" Google Sheet. It compares a measured TWA with the 82 dBA Action Level and 85 dBA Exposure Limit and shows the notification statements and chart from the sheet.

Plain HTML, CSS, and JavaScript with no build step. Open `index.html` in a browser, or deploy the repo as a static site.

- `index.html`: the page
- `calc.js`: the over/under and statement logic, with the sheet cell each piece comes from
- `app.js`: connects the form to the logic and draws the chart (SVG)
- `style.css`: the styles
