/* ============================================================
   swipe.js — Tinder-style drag handling for a single card.
   NGS.attachSwipe(cardEl, onDecision) wires pointer drag +
   fling animation. onDecision("yes"|"no") fires once the card
   is released past the threshold (or via the fling() it returns,
   used by the on-screen YES/NO buttons).
   ============================================================ */
window.NGS = window.NGS || {};

NGS.attachSwipe = function (card, onDecision) {
  var startX = 0, dx = 0, dy = 0, drag = false;
  var yes = card.querySelector(".stamp.yes");
  var no  = card.querySelector(".stamp.no");
  var THRESHOLD = 95;

  function point(e) {
    return { x: (e.touches ? e.touches[0].clientX : e.clientX),
             y: (e.touches ? e.touches[0].clientY : e.clientY) };
  }

  function down(e) {
    if (card.querySelector(".result.show")) return; // already decided
    drag = true; card.classList.add("dragging");
    var p = point(e); startX = p.x; startY = p.y;
  }
  var startY = 0;

  function move(e) {
    if (!drag) return;
    var p = point(e); dx = p.x - startX; dy = p.y - startY;
    // let vertical scrolls pass through
    if (Math.abs(dx) < Math.abs(dy) && Math.abs(dy) > 14 && Math.abs(dx) < 10) return;
    if (e.preventDefault) e.preventDefault();
    card.style.transform = "translate(" + dx + "px," + (dy * 0.25) + "px) rotate(" + (dx * 0.05) + "deg)";
    if (yes) yes.style.opacity = Math.max(0, Math.min(1, dx / 90));
    if (no)  no.style.opacity  = Math.max(0, Math.min(1, -dx / 90));
  }

  function up() {
    if (!drag) return;
    drag = false; card.classList.remove("dragging");
    if (dx > THRESHOLD) fling("yes");
    else if (dx < -THRESHOLD) fling("no");
    else reset();
    dx = 0; dy = 0;
  }

  function reset() {
    card.style.transform = "";
    if (yes) yes.style.opacity = 0;
    if (no)  no.style.opacity = 0;
  }

  function fling(v) {
    var off = v === "yes" ? 600 : -600;
    card.style.transition = "transform .45s ease";
    card.style.transform = "translate(" + off + "px,40px) rotate(" + (off * 0.04) + "deg)";
    setTimeout(function () { onDecision(v); }, 220);
  }

  card.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move, { passive: false });
  window.addEventListener("pointerup", up);

  return fling; // exposed for the YES/NO buttons
};
