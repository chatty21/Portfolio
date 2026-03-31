/* ── LOADER ── */
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  if (fill) fill.style.width = '100%';
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) {
      l.style.opacity = '0';
      l.style.pointerEvents = 'none';
      setTimeout(() => l.remove(), 600);
    }
  }, 900);
});

/* ── AOS ── */
AOS.init({ duration: 700, once: true, offset: 50, easing: 'ease-out-cubic' });

/* ── TYPED ── */
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#typed-text', {
    strings: [
      'decision-ready dashboards.',
      'stakeholder-friendly insights.',
      'production-grade data pipelines.',
      'business metrics that make sense.',
      'analysis teams can actually use.',
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1800,
    loop: true,
  });
});

const body = document.body;

/* ── CUSTOM CURSOR ── */
const cur = document.getElementById('cursor');
const fol = document.getElementById('cursor-follower');
const useFinePointer =
  window.matchMedia('(pointer:fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (useFinePointer) {
  let mx = 0;
  let my = 0;
  let fx = 0;
  let fy = 0;
  const hero = document.getElementById('hero');
  const heroMain = document.querySelector('.hero-main');
  const heroPanel = document.querySelector('.hero-panel');

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = `${mx}px`;
    cur.style.top = `${my}px`;

    if (hero) {
      const rect = hero.getBoundingClientRect();
      const inHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (inHero) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        body.style.setProperty('--spot-x', `${x}%`);
        body.style.setProperty('--spot-y', `${y}%`);
      }
    }
  });

  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    fol.style.left = `${fx}px`;
    fol.style.top = `${fy}px`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a,button,.proj-card,.skill-chip,.cert-card,[data-magnetic]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('ch');
      fol.classList.add('ch');
    });
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('ch');
      fol.classList.remove('ch');
    });
  });

  if (hero && heroMain && heroPanel) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroMain.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0)`;
      heroPanel.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroMain.style.transform = '';
      heroPanel.style.transform = '';
    });
  }
}

/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('heroCanvas');
const ctx2 = canvas.getContext('2d');

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

resize();
window.addEventListener('resize', resize);

const pointCount = innerWidth < 700 ? 55 : innerWidth < 1100 ? 85 : 120;
const pts = Array.from({ length: pointCount }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  r: Math.random() * 1.4 + 0.3,
  a: Math.random() * 0.4 + 0.08,
}));

function animPts() {
  ctx2.clearRect(0, 0, canvas.width, canvas.height);

  pts.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx2.beginPath();
    ctx2.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx2.fillStyle = `rgba(22,93,255,${p.a})`;
    ctx2.fill();
  });

  for (let i = 0; i < pts.length; i += 1) {
    for (let j = i + 1; j < pts.length; j += 1) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d = Math.hypot(dx, dy);

      if (d < 110) {
        ctx2.strokeStyle = `rgba(22,93,255,${0.07 * (1 - d / 110)})`;
        ctx2.lineWidth = 0.5;
        ctx2.beginPath();
        ctx2.moveTo(pts[i].x, pts[i].y);
        ctx2.lineTo(pts[j].x, pts[j].y);
        ctx2.stroke();
      }
    }
  }

  requestAnimationFrame(animPts);
}

animPts();

/* ── SCROLL PROGRESS ── */
const prog = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
  prog.style.width = `${pct}%`;
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
  document.getElementById('backTop').classList.toggle('visible', scrollY > 400);
});

/* ── ACTIVE NAV + SCENE ── */
const secs = document.querySelectorAll('section[id]');
const sceneSecs = document.querySelectorAll('section[data-scene]');
const navAs = document.querySelectorAll('.nav-link');

new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navAs.forEach((a) => a.classList.remove('active'));
      const l = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (l) l.classList.add('active');
    }
  });
}, { threshold: 0.35 }).observe &&
  secs.forEach((s) =>
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navAs.forEach((a) => a.classList.remove('active'));
          const l = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (l) l.classList.add('active');
        }
      });
    }, { threshold: 0.35 }).observe(s)
  );

const sceneObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      body.dataset.scene = entry.target.dataset.scene || 'hero';
    }
  });
}, { threshold: 0.45 });

sceneSecs.forEach((section) => sceneObserver.observe(section));

/* ── MOBILE MENU ── */
const tog = document.getElementById('mobile-menu');
const nls = document.getElementById('nav-links');

tog.addEventListener('click', () => {
  nls.classList.toggle('open');
  tog.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

nls.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    nls.classList.remove('open');
    tog.classList.remove('active');
    document.body.classList.remove('menu-open');
  })
);

/* ── COUNT-UP ── */
document.querySelectorAll('.hs-num').forEach((el) => {
  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;

    const t = +el.dataset.count;
    const dur = 1400;
    const step = t / (dur / 16);
    let c = 0;

    const iv = setInterval(() => {
      c = Math.min(c + step, t);
      el.textContent = Math.floor(c);
      if (c >= t) clearInterval(iv);
    }, 16);

    obs.unobserve(el);
  }, { threshold: 0.6 });

  obs.observe(el);
});

/* ── SKILLS ICON GRID ── */
const skillData = [
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg' },
  { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain-wordmark.svg' },
  { name: 'Tableau', logo: 'https://www.svgrepo.com/show/354427/tableau.svg' },
  { name: 'Power BI', logo: 'https://img.icons8.com/?size=100&id=qYfwpsRXEcpc&format=png&color=000000' },
  { name: 'Looker', logo: 'https://img.icons8.com/?size=100&id=SruJhzn0nnLl&format=png&color=000000' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original-wordmark.svg' },
  { name: 'Hadoop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain-wordmark.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg' },
  { name: 'Neo4j', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNtG3sNJP-TjvG3OL5GP4t9NK-goDIHr8Y0XGHGYeC4UYPo6Pt-7Jp3ZKJXOGEq0a0M6Y&usqp=CAU' },
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg' },
];

const g = document.getElementById('skills-grid');

skillData.forEach((s, i) => {
  const d = document.createElement('div');
  d.className = 'skill-chip';
  d.setAttribute('data-aos', 'zoom-in');
  d.setAttribute('data-aos-delay', i * 35);
  d.style.animationDuration = `${(Math.random() * 3 + 4).toFixed(2)}s`;
  d.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
  d.innerHTML = `<img src="${s.logo}" alt="${s.name}" loading="lazy"><span>${s.name}</span>`;
  g.appendChild(d);
});

/* ── PROJECT SPOTLIGHT ── */
const projectSpotlight = document.getElementById('projectSpotlight');
const projectSpotlightMedia = document.getElementById('projectSpotlightMedia');
const projectSpotlightTitle = document.getElementById('projectSpotlightTitle');
const projectSpotlightText = document.getElementById('projectSpotlightText');
const projectsStoryYear = document.getElementById('projectsStoryYear');
const projectsStoryTitle = document.getElementById('projectsStoryTitle');
const projectsStoryText = document.getElementById('projectsStoryText');
const projectsStoryTags = document.getElementById('projectsStoryTags');

const projectCards = Array.from(document.querySelectorAll('.proj-card'));

const extractProjectData = (card) => ({
  title: card.querySelector('h3')?.textContent || 'Project',
  text: card.querySelector('p')?.textContent || '',
  year: card.querySelector('.proj-yr')?.textContent || '',
  image: card.querySelector('.proj-thumb')?.style.backgroundImage || '',
  tags: Array.from(card.querySelectorAll('.proj-tags span')).map((tag) => tag.textContent),
});

const setActiveProject = (card) => {
  if (!card) return;

  projectCards.forEach((item) => item.classList.remove('is-active'));
  card.classList.add('is-active');

  const data = extractProjectData(card);

  if (projectsStoryYear) projectsStoryYear.textContent = data.year;
  if (projectsStoryTitle) projectsStoryTitle.textContent = data.title;
  if (projectsStoryText) projectsStoryText.textContent = data.text;
  if (projectsStoryTags) {
    projectsStoryTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
  }
};

setActiveProject(projectCards[0]);

if (useFinePointer && projectSpotlight) {
  const moveSpotlight = (x, y) => {
    projectSpotlight.style.left = `${x}px`;
    projectSpotlight.style.top = `${y}px`;
    projectSpotlight.style.setProperty('--px', '16px');
    projectSpotlight.style.setProperty('--py', '18px');
  };

  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
      const data = extractProjectData(card);
      setActiveProject(card);
      projectSpotlightMedia.style.backgroundImage = data.image;
      projectSpotlightTitle.textContent = data.title;
      projectSpotlightText.textContent = data.text;
      projectSpotlight.classList.add('visible');
      moveSpotlight(e.clientX, e.clientY);
    });

    card.addEventListener('mousemove', (e) => {
      moveSpotlight(e.clientX, e.clientY);
    });

    card.addEventListener('mouseleave', () => {
      projectSpotlight.classList.remove('visible');
    });
  });
}

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveProject(entry.target);
    }
  });
}, { threshold: 0.55 });

projectCards.forEach((card) => projectObserver.observe(card));

/* ── BACK TO TOP ── */
document.getElementById('backTop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ── MAGNETIC BUTTONS ── */
if (useFinePointer) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ── CARD 3D TILT ── */
if (useFinePointer) {
  document.querySelectorAll('.proj-card,.edu-card,.cert-card,.exp-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
