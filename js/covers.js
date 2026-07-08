/* ============================================================
   covers.js — article cover art.
   Primary: a real, free-license photo from Pexels (no attribution
   required) chosen to fit each story. If the photo fails to load
   (offline / CDN hiccup on the projector), it is removed via
   onerror and a built-in SVG illustration on the topic gradient
   shows through — so a cover is never broken.
   ============================================================ */
window.NGS = window.NGS || {};

(function () {
  /* ---- Pexels photo id per article (image is derived from the id) ---- */
  var PHOTO = {
    a1: "3888151",   // laptop with code — AI / KI-Campus
    a2: "8199659",   // students in a university library — Bildungscampus
    a3: "20303832",  // car tyre on asphalt — microplastics
    a4: "19828386",  // city lights reflecting on a river at night — Lichterfest
    a5: "17505851",  // ferris wheel at night — Volksfest
    a6: "28948294",  // football stadium, green pitch — Frankenstadion
    a7: "4372152",   // bridge over a river in a city — Green Capital
    a8: "13023282",  // coffee-shop interior — cafés
    a9: "19191521",  // football fans cheering — public viewing
    a10: "8325706",  // colourful laboratory beakers — experimenta
    a11: "4508751",  // data-center server corridor — Schwarz Digits
    a12: "8975011",  // ice-hockey player on the rink — Falken
    a13: "7651733"   // young team collaborating in an office — Campus Founders
  };
  function photoUrl(id) {
    return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id +
           ".jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=500";
  }

  /* ---- SVG fallback motifs (white line-art + lime accent) ---- */
  var W  = 'fill="none" stroke="#fff" stroke-opacity=".26" stroke-linecap="round" stroke-linejoin="round"';
  var Wt = 'fill="none" stroke="#fff" stroke-opacity=".24"';
  var L  = 'fill="none" stroke="#C5E94A" stroke-opacity=".85" stroke-linecap="round" stroke-linejoin="round"';

  var ART = {
    a1: '<g ' + Wt + ' stroke-width="4"><line x1="150" y1="60" x2="230" y2="40"/><line x1="150" y1="60" x2="240" y2="112"/><line x1="230" y1="40" x2="300" y2="88"/><line x1="240" y1="112" x2="300" y2="88"/><line x1="150" y1="60" x2="212" y2="160"/><line x1="240" y1="112" x2="212" y2="160"/><line x1="212" y1="160" x2="300" y2="182"/></g><g fill="#fff" fill-opacity=".2"><circle cx="150" cy="60" r="10"/><circle cx="230" cy="40" r="9"/><circle cx="300" cy="88" r="11"/><circle cx="212" cy="160" r="9"/><circle cx="300" cy="182" r="8"/></g><circle cx="240" cy="112" r="14" fill="#C5E94A" fill-opacity=".9"/>',
    a2: '<g ' + W + ' stroke-width="5"><path d="M170 152 Q220 132 270 152 L270 82 Q220 62 170 82 Z"/><line x1="220" y1="74" x2="220" y2="152"/></g><circle cx="272" cy="64" r="30" ' + L + ' stroke-width="5"/><path d="M272 64 L272 46 M272 64 L288 72" ' + L + ' stroke-width="5"/>',
    a3: '<g ' + Wt + ' stroke-width="5"><circle cx="252" cy="112" r="60"/><circle cx="252" cy="112" r="30"/><line x1="252" y1="52" x2="252" y2="72"/><line x1="252" y1="152" x2="252" y2="172"/><line x1="192" y1="112" x2="212" y2="112"/><line x1="292" y1="112" x2="312" y2="112"/></g><g fill="#C5E94A" fill-opacity=".8"><circle cx="150" cy="72" r="7"/><circle cx="172" cy="120" r="5"/><circle cx="150" cy="150" r="6"/></g>',
    a4: '<g ' + L + ' stroke-width="4"><line x1="252" y1="72" x2="252" y2="30"/><line x1="252" y1="72" x2="210" y2="42"/><line x1="252" y1="72" x2="294" y2="42"/><line x1="252" y1="72" x2="200" y2="82"/><line x1="252" y1="72" x2="304" y2="82"/></g><circle cx="252" cy="72" r="12" fill="#C5E94A" fill-opacity=".9"/><g ' + Wt + ' stroke-width="4"><path d="M120 142 q25 -18 50 0 t50 0 t50 0 t50 0"/><path d="M120 168 q25 -18 50 0 t50 0 t50 0 t50 0"/></g>',
    a5: '<g ' + Wt + ' stroke-width="4"><circle cx="252" cy="96" r="65"/><line x1="252" y1="31" x2="252" y2="161"/><line x1="187" y1="96" x2="317" y2="96"/><line x1="206" y1="50" x2="298" y2="142"/><line x1="298" y1="50" x2="206" y2="142"/><path d="M252 161 L227 196 M252 161 L277 196"/></g><g fill="#C5E94A" fill-opacity=".85"><circle cx="252" cy="31" r="8"/><circle cx="317" cy="96" r="8"/><circle cx="252" cy="161" r="8"/><circle cx="187" cy="96" r="8"/></g>',
    a6: '<g ' + Wt + ' stroke-width="5"><ellipse cx="252" cy="122" rx="80" ry="46"/><ellipse cx="252" cy="122" rx="40" ry="22"/></g><g><line x1="187" y1="72" x2="187" y2="32" stroke="#C5E94A" stroke-opacity=".85" stroke-width="4"/><rect x="174" y="20" width="26" height="12" rx="3" fill="#C5E94A" fill-opacity=".8"/><line x1="317" y1="72" x2="317" y2="32" stroke="#C5E94A" stroke-opacity=".85" stroke-width="4"/><rect x="304" y="20" width="26" height="12" rx="3" fill="#C5E94A" fill-opacity=".8"/></g>',
    a7: '<g ' + W + ' stroke-width="5"><path d="M110 150 Q250 58 390 150"/><line x1="110" y1="150" x2="390" y2="150"/><line x1="170" y1="122" x2="170" y2="150"/><line x1="212" y1="96" x2="212" y2="150"/><line x1="288" y1="96" x2="288" y2="150"/><line x1="330" y1="122" x2="330" y2="150"/></g><line x1="250" y1="60" x2="250" y2="150" ' + L + ' stroke-width="5"/>',
    a8: '<g ' + W + ' stroke-width="5"><path d="M190 112 L200 176 Q205 186 215 186 L265 186 Q275 186 280 176 L290 112 Z"/><path d="M290 124 Q322 124 322 147 Q322 170 292 170"/><line x1="184" y1="112" x2="296" y2="112"/></g><g ' + L + ' stroke-width="4"><path d="M222 92 q-10 -12 0 -24 q10 -12 0 -24"/><path d="M252 92 q-10 -12 0 -24 q10 -12 0 -24"/></g>',
    a9: '<g ' + Wt + ' stroke-width="4"><rect x="150" y="52" width="150" height="98" rx="10"/><line x1="208" y1="166" x2="242" y2="166"/><line x1="225" y1="150" x2="225" y2="166"/></g><circle cx="252" cy="101" r="34" ' + L + ' stroke-width="4"/><g fill="#C5E94A" fill-opacity=".8"><path d="M252 81 l12 9 -5 15 -14 0 -5 -15z"/></g>',
    a10: '<g ' + W + ' stroke-width="5"><path d="M236 60 L236 100 L206 166 Q203 179 217 179 L285 179 Q299 179 296 166 L266 100 L266 60"/><line x1="229" y1="60" x2="273" y2="60"/><line x1="217" y1="150" x2="285" y2="150"/></g><g fill="none" stroke="#C5E94A" stroke-opacity=".8" stroke-width="3"><ellipse cx="251" cy="90" rx="55" ry="20" transform="rotate(30 251 90)"/><ellipse cx="251" cy="90" rx="55" ry="20" transform="rotate(-30 251 90)"/></g><circle cx="251" cy="90" r="6" fill="#C5E94A" fill-opacity=".9"/>',
    a11: '<g ' + Wt + ' stroke-width="4"><rect x="185" y="72" width="130" height="30" rx="7"/><rect x="185" y="112" width="130" height="30" rx="7"/><rect x="185" y="152" width="130" height="30" rx="7"/><circle cx="205" cy="87" r="4"/><circle cx="205" cy="127" r="4"/><circle cx="205" cy="167" r="4"/></g><path d="M225 56 a18 18 0 0 1 34 -6 a15 15 0 0 1 10 27 h-52 a13 13 0 0 1 8 -21z" fill="#C5E94A" fill-opacity=".8"/>',
    a12: '<g fill="none" stroke="#fff" stroke-opacity=".26" stroke-width="6" stroke-linecap="round"><path d="M178 58 L276 152 L322 152"/></g><rect x="200" y="166" width="34" height="14" rx="6" fill="#C5E94A" fill-opacity=".85"/><line x1="150" y1="188" x2="330" y2="188" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="3"/>'
  };
  var GEN = '<g ' + Wt + ' stroke-width="4"><circle cx="250" cy="80" r="46"/></g><g fill="#C5E94A" fill-opacity=".8"><circle cx="290" cy="150" r="10"/><circle cx="200" cy="150" r="7"/></g>';

  function coverSvg(a) {
    var motif = (a && ART[a.id]) ? ART[a.id] : GEN;
    return '<svg class="cover-art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + motif + '</svg>';
  }

  NGS.coverArt = function (a) {
    var svg = coverSvg(a);
    var id = a && PHOTO[a.id];
    if (!id) return svg;
    // photo on top; if it fails to load, remove it so the SVG shows through
    var img = '<img class="cover-photo" src="' + photoUrl(id) + '" alt="" loading="lazy" onerror="this.remove()" />';
    var scrim = '<span class="cover-scrim" aria-hidden="true"></span>';
    return svg + img + scrim;
  };
})();