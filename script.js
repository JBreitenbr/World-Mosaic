// Kleine Zeit-Engine für die Zeitzonen

const BAND_LABELS = {
  dawn: "Dämmerung",
  morning: "Morgen",
  noon: "Mittag",
  afternoon: "Nachmittag",
  evening: "Abend",
  night: "Nacht"
};

const BAND_TAGLINES = {
  dawn: "Zwischen Nacht und Tag.",
  morning: "Die Welt rollt langsam an.",
  noon: "Das Licht steht hoch und klar.",
  afternoon: "Streiflicht, längere Schatten.",
  evening: "Goldene Stunde. Die Luft wird weicher.",
  night: "Nachtlichter, leiser Puls."
};

function getBandFromHour(hour) {
  const h = Number(hour);
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 12) return "morning";
  if (h >= 12 && h < 15) return "noon";
  if (h >= 15 && h < 19) return "afternoon";
  if (h >= 19 && h < 23) return "evening";
  return "night";
}

function updateWorldMosaicTimes() {
  const cards = document.querySelectorAll(".country-card[data-tz]");
  const now = new Date();

  cards.forEach(card => {
    const tz = card.dataset.tz;
    const timeEl = card.querySelector(".js-time");
    const bandLabelEl = card.querySelector(".js-band-label");
    const taglineEl = card.querySelector(".js-tagline");

    if (!tz || !timeEl) return;

    try {
      const formatter = new Intl.DateTimeFormat("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: tz
      });

      const formatted = formatter.format(now);
      timeEl.textContent = formatted;

      const hour = formatted.split(":")[0];
      const band = getBandFromHour(hour);

      if (bandLabelEl) {
        bandLabelEl.textContent = BAND_LABELS[band] || "";
      }

      // Nur überschreiben, wenn eine generische Tagline verwendet wird
      if (taglineEl && taglineEl.dataset.locked !== "true") {
        taglineEl.textContent = BAND_TAGLINES[band] || taglineEl.textContent;
      }

      card.dataset.band = band;
    } catch (e) {
      console.error("Fehler bei Zeitzone:", tz, e);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateWorldMosaicTimes();
  // Alle 60 Sekunden aktualisieren
  setInterval(updateWorldMosaicTimes, 60 * 1000);
});
