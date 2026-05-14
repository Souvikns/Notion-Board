/* ===== Mobile Navigation Toggle ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navCtas = document.getElementById('navCtas');

if (navToggle && navLinks && navCtas) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      navLinks.classList.remove('open');
      navCtas.classList.remove('open');
    } else {
      navLinks.classList.add('open');
      navCtas.classList.add('open');
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navCtas.classList.remove('open');
    });
  });
}

/* ===== Copy Code Button ===== */
const copyBtn = document.getElementById('copyBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const targetId = copyBtn.getAttribute('data-target');
    const target = document.getElementById(targetId);
    if (!target) return;

    const text = target.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.background = 'rgba(255,255,255,0.25)';
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.style.background = '';
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = original; }, 2000);
      } catch (e) {
        // ignore
      }
      document.body.removeChild(textarea);
    });
  });
}

/* ===== Docs Sidebar Scroll Spy ===== */
const docsNav = document.getElementById('docsNav');
const docsContent = document.getElementById('docsContent');

if (docsNav && docsContent) {
  const headings = docsContent.querySelectorAll('h2[id], h3[id], h4[id]');
  const navLinks = docsNav.querySelectorAll('a');

  const observerOptions = {
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  headings.forEach(h => observer.observe(h));

  // Smooth scroll for sidebar links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ===== Keyboard shortcut for search (future-proof) ===== */
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    // Future: open search modal
  }
});

/* ===== GitHub Star Count ===== */
(function fetchGitHubStars() {
  var countEl = document.getElementById('githubStarCount');
  if (!countEl) return;

  function formatStars(n) {
    if (n >= 1000) {
      var k = n / 1000;
      return (k >= 10 ? Math.round(k) : Math.round(k * 10) / 10) + 'k';
    }
    return String(n);
  }

  fetch('https://api.github.com/repos/Souvikns/Notion-Board')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && typeof data.stargazers_count === 'number') {
        countEl.textContent = formatStars(data.stargazers_count);
      } else {
        countEl.textContent = '★';
      }
    })
    .catch(function() {
      countEl.textContent = '★';
    });
})();
