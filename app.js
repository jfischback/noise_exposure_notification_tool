const $ = (id) => document.getElementById(id);
const SVG = "http://www.w3.org/2000/svg";

// Blank or non-numeric Measured TWA is treated as blank.
function twaValue() {
  const raw = $("twa").value.trim();
  if (raw === "") return "";
  const v = Number(raw);
  return Number.isFinite(v) ? v : "";
}

function el(name, attrs, text) {
  const node = document.createElementNS(SVG, name);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  if (text !== undefined) node.textContent = text;
  return node;
}

// Column chart from the sheet: one dark bar for the measured TWA, dashed lines at
// 82 (orange) and 85 (dark red), Y axis fixed 0 to 100, legend at the bottom.
function drawChart(value) {
  const svg = $("chart");
  svg.replaceChildren();
  const W = 400, H = 440;
  const left = 56, right = 16, top = 48, bottom = 100;
  const plotW = W - left - right, plotH = H - top - bottom;
  const y = (v) => top + plotH - (Math.min(100, Math.max(0, v)) / 100) * plotH;

  svg.append(el("text", { x: W / 2, y: 26, class: "c-title", "text-anchor": "middle" }, "Your Exposure"));

  for (let v = 0; v <= 100; v += 20) {
    svg.append(el("line", { x1: left, x2: W - right, y1: y(v), y2: y(v), class: "c-grid" }));
    svg.append(el("text", { x: left - 8, y: y(v) + 4, class: "c-tick", "text-anchor": "end" }, v));
  }
  svg.append(el("text", {
    x: 16, y: top + plotH / 2, class: "c-axis", "text-anchor": "middle",
    transform: `rotate(-90 16 ${top + plotH / 2})`,
  }, "DECIBELS (dBA)"));

  // Bar sits in the middle of three category slots, as in the Chart Data tab.
  const slot = plotW / 3;
  const barW = slot * 0.6;
  const barX = left + slot + (slot - barW) / 2;
  const barTop = y(value);
  const barH = top + plotH - barTop;
  svg.append(el("rect", { x: barX, y: barTop, width: barW, height: barH, fill: "#191919" }));
  const label = String(value);
  if (barH >= 24) {
    svg.append(el("text", { x: barX + barW / 2, y: barTop + 18, class: "c-label", "text-anchor": "middle" }, label));
  } else {
    // Too short to fit the label inside, so it sits just above the bar.
    svg.append(el("text", { x: barX + barW / 2, y: barTop - 6, class: "c-label dark", "text-anchor": "middle" }, label));
  }
  svg.append(el("text", { x: left + slot * 1.5, y: top + plotH + 20, class: "c-tick", "text-anchor": "middle" }, "Measured Exposure"));

  svg.append(el("line", { x1: left, x2: W - right, y1: y(ACTION_LEVEL), y2: y(ACTION_LEVEL), class: "c-line", stroke: "#e57f00" }));
  svg.append(el("line", { x1: left, x2: W - right, y1: y(EXPOSURE_LIMIT), y2: y(EXPOSURE_LIMIT), class: "c-line", stroke: "#cc0000" }));

  // Legend
  const items = [
    ["Your Exposure", "bar", "#191919"],
    ["Action Level", "line", "#e57f00"],
    ["Exposure Limit", "line", "#cc0000"],
  ];
  const ly = H - 30;
  let lx = 40;
  for (const [name, kind, color] of items) {
    if (kind === "bar") svg.append(el("rect", { x: lx, y: ly - 9, width: 12, height: 12, fill: color }));
    else svg.append(el("line", { x1: lx - 4, x2: lx + 16, y1: ly - 3, y2: ly - 3, class: "c-line", stroke: color }));
    svg.append(el("text", { x: lx + 20, y: ly + 1, class: "c-tick" }, name));
    lx += 20 + name.length * 7 + 20;
  }
}

function update() {
  const r = calculate(twaValue());
  $("yourExposure").textContent = r.yourExposure;
  setResult($("actionResult"), r.actionResult);
  setResult($("limitResult"), r.limitResult);
  $("statements").replaceChildren(...r.statements.map((s) => {
    const p = document.createElement("p");
    p.textContent = s;
    return p;
  }));
  drawChart(r.chartValue);
}

function setResult(node, value) {
  node.textContent = value;
  node.className = value ? "pill " + value.toLowerCase() : "";
}

$("form").addEventListener("input", update);
update();
