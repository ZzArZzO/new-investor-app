(function () {
  'use strict';

  var STORAGE_KEY = 'ni_lesson_progress';
  var TOTAL = LESSONS.length;

  var lessonsContainer = document.getElementById('lessonsContainer');
  var lessonComplete = document.getElementById('lessonComplete');
  var lessonNavButtons = document.getElementById('lessonNavButtons');
  var pillarNav = document.getElementById('pillarNav');
  var lessonPosition = document.getElementById('lessonPosition');
  var progressFill = document.getElementById('progressFill');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var settingsBtn = document.getElementById('settingsBtn');
  var settingsPanel = document.getElementById('settingsPanel');
  var resetProgressBtn = document.getElementById('resetProgressBtn');
  var closeSettingsBtn = document.getElementById('closeSettingsBtn');
  var toast = document.getElementById('toast');
  var feedbackForm = document.getElementById('feedbackForm');
  var feedbackSuccess = document.getElementById('feedbackSuccess');

  var accountStatus = document.getElementById('accountStatus');
  var accountSignedOut = document.getElementById('accountSignedOut');
  var accountSignedIn = document.getElementById('accountSignedIn');
  var accountEmail = document.getElementById('accountEmail');
  var accountSignInBtn = document.getElementById('accountSignInBtn');
  var accountHint = document.getElementById('accountHint');
  var accountEmailDisplay = document.getElementById('accountEmailDisplay');
  var accountSignOutBtn = document.getElementById('accountSignOutBtn');

  var progress = loadProgress();
  var current = progress.current || 1;
  var showingComplete = false;

  function loadProgress() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && typeof raw === 'object') {
        return {
          current: raw.current || 1,
          furthest: raw.furthest || 1,
          completed: Array.isArray(raw.completed) ? raw.completed : []
        };
      }
    } catch (e) {}
    return { current: 1, furthest: 1, completed: [] };
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) {}
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  // ---------- render lesson HTML ----------
  function renderChecks(checks) {
    return checks.map(function (c, i) {
      return '<div class="check-item">' +
        '<p class="check-q">Q' + (i + 1) + '. ' + c.q + '</p>' +
        '<button type="button" class="check-reveal" aria-expanded="false">Show answer</button>' +
        '<p class="check-a" hidden>' + c.a + '</p>' +
        '</div>';
    }).join('');
  }

  function renderChart(key) {
    if (!key) return '';
    var c = CHARTS[key];
    return '<div class="chart-card">' + c.svg +
      (c.legend ? '<div class="chart-legend">' + c.legend + '</div>' : '') +
      '<p class="cap">' + c.caption + '</p></div>';
  }

  function renderLessonSection(lesson) {
    var html = '<section class="lesson" id="lesson-' + lesson.id + '" data-lesson="' + lesson.id + '" hidden aria-labelledby="lessonTitle-' + lesson.id + '">';
    html += '<p class="lesson-pillar">' + lesson.emoji + ' ' + lesson.pillar + ' · Lesson ' + lesson.id + '</p>';
    html += '<h2 id="lessonTitle-' + lesson.id + '" tabindex="-1">' + lesson.title + '</h2>';
    html += '<div class="core-idea"><b>Core idea:</b> ' + lesson.coreIdea + '</div>';
    html += '<h3>Reading</h3>';
    lesson.reading.forEach(function (p) { html += '<p>' + p + '</p>'; });
    if (lesson.list) {
      html += '<ul>' + lesson.list.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
    }
    if (lesson.readingAfterList) {
      lesson.readingAfterList.forEach(function (p) { html += '<p>' + p + '</p>'; });
    }
    html += renderChart(lesson.chart);
    html += '<h3>Real-world example</h3><div class="example-box"><p style="margin-bottom:0">' + lesson.example + '</p></div>';
    if (lesson.riskNote) {
      html += '<div class="risk-note">' + lesson.riskNote + '</div>';
    }
    html += '<div class="checks"><h3>Quick check</h3>' + renderChecks(lesson.checks) + '</div>';
    html += '</section>';
    return html;
  }

  lessonsContainer.innerHTML = LESSONS.map(renderLessonSection).join('');

  // check-reveal buttons
  lessonsContainer.addEventListener('click', function (e) {
    var btn = e.target.closest('.check-reveal');
    if (!btn) return;
    var answer = btn.nextElementSibling;
    var isHidden = answer.hasAttribute('hidden');
    if (isHidden) {
      answer.removeAttribute('hidden');
      btn.textContent = 'Hide answer';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      answer.setAttribute('hidden', '');
      btn.textContent = 'Show answer';
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- dots / nav ----------
  function renderDots() {
    var html = LESSONS.map(function (l) {
      var isDone = progress.completed.indexOf(l.id) !== -1;
      var locked = l.id > progress.furthest;
      var state = isDone ? 'done' : (l.id === current ? 'current' : (locked ? 'locked' : 'available'));
      var label = 'Lesson ' + l.id + ': ' + l.title + (isDone ? ' (completed)' : locked ? ' (locked)' : '');
      return '<button type="button" class="lesson-dot" data-id="' + l.id + '" data-state="' + state + '"' +
        (locked ? ' disabled aria-disabled="true"' : '') +
        (l.id === current && !showingComplete ? ' aria-current="step"' : '') +
        ' aria-label="' + label + '">' + (isDone ? '✓' : l.id) + '</button>';
    }).join('');
    pillarNav.innerHTML = html;
  }

  pillarNav.addEventListener('click', function (e) {
    var btn = e.target.closest('.lesson-dot');
    if (!btn || btn.disabled) return;
    var id = parseInt(btn.getAttribute('data-id'), 10);
    goToLesson(id);
  });

  function updateTopbar() {
    if (showingComplete) {
      lessonPosition.textContent = 'Finished';
      progressFill.style.width = '100%';
      return;
    }
    lessonPosition.textContent = 'Lesson ' + current + ' of ' + TOTAL;
    progressFill.style.width = Math.round(((current - 1) / TOTAL) * 100) + '%';
  }

  function goToLesson(id, opts) {
    showingComplete = false;
    current = id;
    progress.current = id;
    progress.furthest = Math.max(progress.furthest, id);
    saveProgress();

    lessonComplete.hidden = true;
    lessonNavButtons.hidden = false;
    var sections = lessonsContainer.querySelectorAll('.lesson');
    sections.forEach(function (s) {
      s.hidden = parseInt(s.getAttribute('data-lesson'), 10) !== id;
    });

    prevBtn.disabled = id === 1;
    nextBtn.textContent = id === TOTAL ? 'Finish →' : 'Next →';

    updateTopbar();
    renderDots();

    if (!opts || !opts.silent) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      var heading = document.getElementById('lessonTitle-' + id);
      if (heading) heading.focus({ preventScroll: true });
    }
  }

  function showCompleteScreen() {
    showingComplete = true;
    lessonsContainer.querySelectorAll('.lesson').forEach(function (s) { s.hidden = true; });
    lessonComplete.hidden = false;
    lessonNavButtons.hidden = true;
    updateTopbar();
    renderDots();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    var title = document.getElementById('completeTitle');
    if (title) { title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
  }

  nextBtn.addEventListener('click', function () {
    if (progress.completed.indexOf(current) === -1) {
      progress.completed.push(current);
      NIAuth.markLessonComplete(current);
    }
    if (current < TOTAL) {
      goToLesson(current + 1);
    } else {
      saveProgress();
      showCompleteScreen();
    }
    saveProgress();
  });

  prevBtn.addEventListener('click', function () {
    if (current > 1) goToLesson(current - 1);
  });

  // ---------- settings ----------
  function openSettings() {
    settingsPanel.hidden = false;
    settingsBtn.setAttribute('aria-expanded', 'true');
    closeSettingsBtn.focus();
  }
  function closeSettings() {
    settingsPanel.hidden = true;
    settingsBtn.setAttribute('aria-expanded', 'false');
    settingsBtn.focus();
  }
  settingsBtn.addEventListener('click', function () {
    settingsPanel.hidden ? openSettings() : closeSettings();
  });
  closeSettingsBtn.addEventListener('click', closeSettings);

  resetProgressBtn.addEventListener('click', function () {
    if (!window.confirm('Reset your lesson progress? This only affects this device.')) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    progress = { current: 1, furthest: 1, completed: [] };
    closeSettings();
    goToLesson(1);
    showToast('Progress reset');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !settingsPanel.hidden) closeSettings();
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'TEXTAREA' || tag === 'INPUT') return;
    if (showingComplete) return;
    if (e.key === 'ArrowRight' && !nextBtn.disabled) nextBtn.click();
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) prevBtn.click();
  });

  // ---------- account (optional Supabase backend) ----------
  function renderAccountUI() {
    var user = NIAuth.getUser();
    if (!NIAuth.isConfigured()) {
      accountStatus.textContent = 'Accounts aren’t set up yet for this preview — your progress is only saved on this device.';
      accountSignedOut.hidden = true;
      accountSignedIn.hidden = true;
      return;
    }
    accountStatus.textContent = 'Sign in to keep your progress across devices.';
    if (user) {
      accountSignedOut.hidden = true;
      accountSignedIn.hidden = false;
      accountEmailDisplay.textContent = user.email || '';
    } else {
      accountSignedOut.hidden = false;
      accountSignedIn.hidden = true;
    }
  }

  function mergeServerProgress(serverCompleted) {
    if (!serverCompleted) return;
    var changed = false;
    serverCompleted.forEach(function (id) {
      if (progress.completed.indexOf(id) === -1) { progress.completed.push(id); changed = true; }
      if (id > progress.furthest) { progress.furthest = id; changed = true; }
    });
    // Push any lesson completed locally (e.g. as a guest) up to the server too.
    progress.completed.forEach(function (id) {
      if (serverCompleted.indexOf(id) === -1) NIAuth.markLessonComplete(id);
    });
    if (changed) {
      saveProgress();
      renderDots();
    }
  }

  accountSignInBtn.addEventListener('click', function () {
    var email = accountEmail.value.trim();
    if (!email) return;
    accountSignInBtn.disabled = true;
    accountHint.textContent = 'Sending…';
    NIAuth.signInWithEmail(email).then(function (res) {
      accountSignInBtn.disabled = false;
      if (res && res.error) {
        accountHint.textContent = res.error.message || 'Something went wrong.';
      } else {
        accountHint.textContent = 'Check your email for a sign-in link.';
      }
    }).catch(function (e) {
      accountSignInBtn.disabled = false;
      accountHint.textContent = e.message || 'Something went wrong.';
    });
  });

  accountSignOutBtn.addEventListener('click', function () {
    NIAuth.signOut().then(function () {
      renderAccountUI();
      showToast('Signed out');
    });
  });

  NIAuth.onChange(function () {
    renderAccountUI();
    NIAuth.fetchProgress().then(mergeServerProgress);
  });

  // ---------- UTM tagging (consistent with the main landing page) ----------
  (function attachUtm() {
    var params = new URLSearchParams(window.location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
    var defaults = { utm_source: 'direct', utm_medium: 'none', utm_campaign: 'none', utm_content: 'none' };
    keys.forEach(function (key) {
      var stored;
      try { stored = sessionStorage.getItem('ni_' + key); } catch (e) {}
      var value = params.get(key) || stored || defaults[key];
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      feedbackForm.appendChild(input);
    });
  })();

  // ---------- feedback form ----------
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(feedbackForm);
    fetch(feedbackForm.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function () {
        feedbackForm.querySelectorAll('textarea, input, button[type=submit]').forEach(function (el) { el.disabled = true; });
        feedbackSuccess.style.display = 'block';
      })
      .catch(function () { showToast('Something went wrong — please try again.'); });
  });

  // ---------- init ----------
  renderDots();
  goToLesson(current, { silent: true });
  updateTopbar();
  renderAccountUI();
  NIAuth.init().then(function (user) {
    renderAccountUI();
    if (user) NIAuth.fetchProgress().then(mergeServerProgress);
  });
})();
