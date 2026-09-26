/* =============================================
   PORTFOLIO — MAIN.JS
   - Mobile nav toggle
   - Footer year
   - Skill bar animation (IntersectionObserver)
   - Portfolio filter
   - WhatsApp contact form
   ============================================= */

// ── Mobile nav toggle ─────────────────────────
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var list   = document.querySelector('.nav-list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', function () {
    var opened = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  // Close when a link is clicked (mobile)
  list.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      list.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ── Footer year ───────────────────────────────
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear().toString();
})();

// ── Skill bar animation ───────────────────────
(function () {
  var bars = document.querySelectorAll('.bar > span[data-width]');
  if (!bars.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el  = entry.target;
          var pct = el.getAttribute('data-width') || '0';
          requestAnimationFrame(function () {
            setTimeout(function () {
              el.style.width = pct + '%';
            }, 120);
          });
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    bars.forEach(function (bar) { observer.observe(bar); });
  } else {
    // Fallback
    bars.forEach(function (bar) {
      bar.style.width = (bar.getAttribute('data-width') || '0') + '%';
    });
  }
})();

// ── Portfolio / Projects filter ───────────────
(function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      cards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          requestAnimationFrame(function () {
            card.style.transition = 'opacity .3s ease';
            card.style.opacity    = '1';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ── WhatsApp contact form ─────────────────────
(function () {
  var form    = document.getElementById('wa-form');
  var errMsg  = document.getElementById('form-error');
  if (!form) return;

  // WhatsApp number (country code, no + or spaces)
  var WA_NUMBER = '6281228075350';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = document.getElementById('sender-name').value.trim();
    var topic   = document.getElementById('sender-topic').value.trim();
    var message = document.getElementById('sender-message').value.trim();

    // Basic validation
    if (!name || !topic || !message) {
      if (errMsg) errMsg.style.display = 'block';
      return;
    }
    if (errMsg) errMsg.style.display = 'none';

    // Build the WA message text
    var text =
      'Halo Azaria! 👋\n\n' +
      '*Nama:* ' + name + '\n' +
      '*Topik:* ' + topic + '\n\n' +
      '*Pesan:*\n' + message;

    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  // Hide error on any input change
  form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () {
      if (errMsg) errMsg.style.display = 'none';
    });
  });
})();
