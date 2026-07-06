// Thin wrapper around the Supabase client so lessons.js never has to
// know whether accounts are configured. Every function is a safe no-op
// (resolves to null/undefined, never throws) when lessons/config.js is
// left blank or the Supabase SDK failed to load — the guest/localStorage
// experience must keep working regardless. See backend/README.md.
(function (global) {
  'use strict';

  var client = null;
  var currentUser = null;
  var listeners = [];

  function isConfigured() {
    return !!(
      global.NI_CONFIG &&
      global.NI_CONFIG.supabaseUrl &&
      global.NI_CONFIG.supabaseAnonKey &&
      global.supabase &&
      typeof global.supabase.createClient === 'function'
    );
  }

  function init() {
    if (!isConfigured()) return Promise.resolve(null);
    try {
      client = global.supabase.createClient(global.NI_CONFIG.supabaseUrl, global.NI_CONFIG.supabaseAnonKey);
    } catch (e) {
      client = null;
      return Promise.resolve(null);
    }
    return client.auth.getSession().then(function (res) {
      currentUser = (res && res.data && res.data.session) ? res.data.session.user : null;
      client.auth.onAuthStateChange(function (_event, session) {
        currentUser = session ? session.user : null;
        listeners.forEach(function (cb) { cb(currentUser); });
      });
      return currentUser;
    }).catch(function () { return null; });
  }

  function onChange(cb) { listeners.push(cb); }

  function getUser() { return currentUser; }

  function signInWithEmail(email) {
    if (!client) return Promise.reject(new Error('Accounts are not set up yet.'));
    return client.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: global.location.href }
    });
  }

  function signOut() {
    if (!client) return Promise.resolve();
    return client.auth.signOut();
  }

  // Returns an array of completed lesson ids, or null if not signed in
  // / not configured (caller should fall back to localStorage).
  function fetchProgress() {
    if (!client || !currentUser) return Promise.resolve(null);
    return client
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', currentUser.id)
      .then(function (res) {
        if (!res || res.error || !res.data) return null;
        return res.data.map(function (row) { return row.lesson_id; });
      })
      .catch(function () { return null; });
  }

  function markLessonComplete(lessonId) {
    if (!client || !currentUser) return Promise.resolve();
    return client
      .from('lesson_progress')
      .upsert({ user_id: currentUser.id, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id' })
      .catch(function () {});
  }

  global.NIAuth = {
    init: init,
    isConfigured: isConfigured,
    onChange: onChange,
    getUser: getUser,
    signInWithEmail: signInWithEmail,
    signOut: signOut,
    fetchProgress: fetchProgress,
    markLessonComplete: markLessonComplete
  };
})(window);
