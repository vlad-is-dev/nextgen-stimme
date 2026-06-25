/* ============================================================
   live.js — real-time Pulse leaderboard backed by Supabase.
   Votes are aggregated atomically server-side (RPC cast_vote)
   and pushed to every device via Postgres realtime.
   If config.js still has placeholders, isConfigured() is false
   and the app falls back to the static seed values.
   ============================================================ */
window.NGS = window.NGS || {};

NGS.Live = (function () {
  var client = null, configured = false;

  function placeholder(v) {
    return !v || v.indexOf("DEINE-") !== -1 || v.indexOf("DEIN-") !== -1 || v.indexOf("YOUR-") !== -1;
  }

  function init() {
    if (placeholder(NGS.SUPABASE_URL) || placeholder(NGS.SUPABASE_ANON_KEY)) { configured = false; return; }
    if (typeof window.supabase === "undefined" || !window.supabase.createClient) { configured = false; return; }
    try {
      client = window.supabase.createClient(NGS.SUPABASE_URL, NGS.SUPABASE_ANON_KEY);
      configured = true;
    } catch (e) { configured = false; }
  }

  function castVote(cardId, choice) {
    if (!configured) return Promise.reject(new Error("not configured"));
    return client.rpc("cast_vote", { p_card_id: cardId, p_choice: choice }).then(function (res) {
      if (res.error) throw res.error;
      return (res.data && res.data[0]) || null;
    });
  }

  function subscribe(cardId, cb) {
    if (!configured) return null;
    var ch = client.channel("pulse_" + cardId)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "pulse_votes", filter: "card_id=eq." + cardId },
        function (payload) { if (payload.new) cb({ yes: payload.new.yes, no: payload.new.no }); })
      .subscribe();
    return ch;
  }

  function unsubscribe(ch) { if (ch && client) try { client.removeChannel(ch); } catch (e) {} }

  return { init: init, castVote: castVote, subscribe: subscribe, unsubscribe: unsubscribe, isConfigured: function () { return configured; } };
})();