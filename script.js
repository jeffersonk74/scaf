const newsItems = [
  {
    title: 'Victoire à domicile pour lancer la saison',
    summary:
      'Le groupe senior a signé un succès solide grâce à une organisation rigoureuse et une intensité constante pendant 90 minutes.',
    date: '12 mai 2026',
  },
  {
    title: 'Nouvelle campagne d’inscriptions jeunes',
    summary:
      'Le club ouvre ses permanences pour accueillir de nouveaux joueurs et renforcer sa filière de formation locale.',
    date: '05 mai 2026',
  },
  {
    title: 'Nos partenaires renouvelés pour 2026',
    summary:
      'Plusieurs sponsors poursuivent leur engagement auprès du club afin de soutenir les équipements, les déplacements et les actions terrain.',
    date: '28 avril 2026',
  },
];

const partners = [
  { name: 'RCA Sport', tag: 'Équipementier officiel' },
  { name: 'Bâtir Pro', tag: 'Partenaire terrain' },
  { name: 'Eco Local', tag: 'Soutien durable' },
  { name: 'Mairie', tag: 'Institution locale' },
];

const fixtures = [
  {
    date: 'Sam. 25 mai',
    kickoff: '18:00',
    opponent: 'AS Horizon',
    location: 'Stade municipal',
    badge: 'Domicile',
  },
  {
    date: 'Dim. 2 juin',
    kickoff: '15:00',
    opponent: 'US Vallée',
    location: 'Terrain annexe',
    badge: 'Extérieur',
  },
  {
    date: 'Sam. 8 juin',
    kickoff: '17:30',
    opponent: 'FC Rive Sud',
    location: 'Stade municipal',
    badge: 'Domicile',
  },
];

const galleryItems = [
  {
    name: 'Amara Diallo',
    role: 'Capitaine',
    tags: ['Leadership', 'Défense'],
    initials: 'AD',
  },
  {
    name: 'Noah Martins',
    role: 'Milieu relayeur',
    tags: ['Vision', 'Presse'],
    initials: 'NM',
  },
  {
    name: 'Yanis Benali',
    role: 'Avant-centre',
    tags: ['Finition', 'Vitesse'],
    initials: 'YB',
  },
  {
    name: 'Coach Morel',
    role: 'Staff technique',
    tags: ['Tactique', 'Préparation'],
    initials: 'CM',
  },
];

const clubTheme = {
  primary: '#16834a',
  primaryDark: '#0f5d34',
  accent: '#d51f32',
};

const newsGrid = document.querySelector('#news-grid');
const calendarGrid = document.querySelector('#calendar-grid');
const galleryGrid = document.querySelector('#gallery-grid');
const partnersStrip = document.querySelector('#partners-strip');
const currentYear = document.querySelector('#current-year');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');
const rootStyle = document.documentElement.style;

rootStyle.setProperty('--primary', clubTheme.primary);
rootStyle.setProperty('--primary-dark', clubTheme.primaryDark);
rootStyle.setProperty('--accent', clubTheme.accent);

/* ==========================
   Hero carousel (autoplay 5s)
   Accessible, pauses on hover/focus and respects prefers-reduced-motion
   Slides are injected into #hero-carousel
   ========================== */

(function () {
  const carouselContainer = document.querySelector('#hero-carousel');
  if (!carouselContainer) return;

  const images = [
    'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517927033932-b3d1d6a2b5a2?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1507211300751-7a4b5a1c8c3b?auto=format&fit=crop&w=1600&q=80'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = 5000;
  let slides = [];
  let active = 0;
  let timer = null;

  function build() {
    carouselContainer.innerHTML = '';
    slides = images.map((src, idx) => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide';
      slide.style.backgroundImage = `url('${src}')`;
      slide.setAttribute('role', 'img');
      slide.setAttribute('aria-label', `Image ${idx + 1} de la galerie`);
      if (idx === 0) slide.classList.add('is-active');
      carouselContainer.appendChild(slide);
      return slide;
    });

    // club gradient overlay
    const clubOverlay = document.createElement('div');
    clubOverlay.className = 'hero-overlay-club';
    carouselContainer.appendChild(clubOverlay);

    // dark overlay for contrast
    const darkOverlay = document.createElement('div');
    darkOverlay.className = 'hero-overlay-dark';
    carouselContainer.appendChild(darkOverlay);
  }

  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    active = index;
  }

  function next() {
    show((active + 1) % slides.length);
  }

  function start() {
    if (prefersReducedMotion) return;
    stop();
    timer = setInterval(next, intervalMs);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  build();
  start();

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stop);
    heroSection.addEventListener('mouseleave', () => { if (!prefersReducedMotion) start(); });
    heroSection.addEventListener('focusin', stop);
    heroSection.addEventListener('focusout', () => { if (!prefersReducedMotion) start(); });
  }
})();

const createNewsCard = ({ title, summary, date }) => {
  const article = document.createElement('article');
  article.className = 'card reveal';
  article.innerHTML = `
    <p class="card-date">${date}</p>
    <h3>${title}</h3>
    <p>${summary}</p>
    <a class="btn-link" href="#contact">Lire la suite</a>
  `;
  return article;
};

const createPartnerLogo = ({ name, tag }) => {
  const item = document.createElement('div');
  item.className = 'partner-logo reveal';
  item.innerHTML = `
    <strong>${name}</strong>
    <span>${tag}</span>
  `;
  return item;
};

const createFixtureCard = ({ date, kickoff, opponent, location, badge }) => {
  const article = document.createElement('article');
  article.className = 'calendar-card reveal';
  article.innerHTML = `
    <div class="fixture-head">
      <p class="fixture-date">${date}</p>
      <span class="fixture-badge">${badge}</span>
    </div>
    <h3 class="fixture-title">SCAF RCA vs ${opponent}</h3>
    <div class="fixture-meta" aria-label="Informations du match">
      <span><strong>Horaire</strong><span>${kickoff}</span></span>
      <span><strong>Lieu</strong><span>${location}</span></span>
    </div>
  `;
  return article;
};

const createPortraitCard = ({ name, role, tags, initials }) => {
  const card = document.createElement('article');
  card.className = 'gallery-card reveal';
  card.innerHTML = `
    <div class="gallery-visual" aria-hidden="true">
      <div class="portrait-placeholder">
        <div class="portrait-badge">
          <svg viewBox="0 0 64 64" role="presentation" focusable="false" aria-hidden="true">
            <circle cx="32" cy="22" r="12"></circle>
            <path d="M14 54c2.8-10.8 11-16 18-16s15.2 5.2 18 16H14z"></path>
          </svg>
        </div>
        <div class="portrait-label">
          <strong>${initials}</strong>
          <span>${role}</span>
        </div>
      </div>
    </div>
    <div class="gallery-content">
      <h3>${name}</h3>
      <p>${role}</p>
      <div class="tag-row" aria-label="Attributs du profil"></div>
    </div>
  `;

  const tagRow = card.querySelector('.tag-row');
  tags.forEach((tag) => {
    const badge = document.createElement('span');
    badge.className = 'tag';
    badge.textContent = tag;
    tagRow.appendChild(badge);
  });

  return card;
};

newsItems.forEach((item) => {
  newsGrid.appendChild(createNewsCard(item));
});

fixtures.forEach((fixture) => {
  calendarGrid.appendChild(createFixtureCard(fixture));
});

galleryItems.forEach((person) => {
  galleryGrid.appendChild(createPortraitCard(person));
});

partners.forEach((partner) => {
  partnersStrip.appendChild(createPartnerLogo(partner));
});

currentYear.textContent = new Date().getFullYear();

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNavigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Fermer le menu' : 'Ouvrir le menu';
  });

  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (primaryNavigation.classList.contains('is-open')) {
        primaryNavigation.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('.sr-only').textContent = 'Ouvrir le menu';
      }
    });
  });
}
