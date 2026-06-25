/* ============================================================
   scanner.js — in-browser QR scanning for the token step.
   Wraps nimiq's qr-scanner (loaded from CDN), which uses the
   native BarcodeDetector where available. Requires HTTPS + a
   user gesture; on iframes/preview the camera is blocked, so
   the app always offers a tap fallback ("Demo-Story").

   NGS.Scanner.start(videoEl, { onResult, onStatus })
   NGS.Scanner.stop()
   ============================================================ */
window.NGS = window.NGS || {};

NGS.Scanner = (function () {
  var qr = null;
  var active = false;

  function start(video, opts) {
    opts = opts || {};
    var status = opts.onStatus || function () {};
    var result = opts.onResult || function () {};

    if (typeof QrScanner === "undefined") {
      status("error", "Scanner-Bibliothek nicht geladen — nutze die Demo-Story.");
      return;
    }
    if (active) return;

    status("starting", "Kamera wird gestartet…");
    try {
      qr = new QrScanner(video, function (res) {
        result(res && res.data ? res.data : res);
      }, {
        highlightScanRegion: false,
        highlightCodeOutline: false,
        returnDetailedScanResult: true,
        preferredCamera: "environment"
      });

      qr.start().then(function () {
        active = true;
        status("running", "Kamera läuft. Scanne einen beliebigen NeXtGen-Token-QR.");
      }).catch(function () {
        status("blocked", "Kamera nicht verfügbar (Vorschau/Iframe oder keine Freigabe). Nutze „Demo-Story öffnen“.");
      });
    } catch (e) {
      status("error", "Kamera nicht verfügbar. Nutze „Demo-Story öffnen“.");
    }
  }

  function stop() {
    if (qr) { try { qr.stop(); qr.destroy(); } catch (e) {} qr = null; }
    active = false;
  }

  return { start: start, stop: stop, isActive: function () { return active; } };
})();
