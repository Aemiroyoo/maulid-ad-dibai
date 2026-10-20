const root = document.documentElement;
let arabicScale = 2;
const setArabicSize = () => root.style.setProperty('--arabic-size', `${arabicScale}rem`);
document.getElementById('increaseText').addEventListener('click', () => {
  arabicScale = Math.min(3.1, +(arabicScale + 0.15).toFixed(2));
  setArabicSize();
});
document.getElementById('decreaseText').addEventListener('click', () => {
  arabicScale = Math.max(1.35, +(arabicScale - 0.15).toFixed(2));
  setArabicSize();
});
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('maulid-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('maulid-theme') === 'dark') document.body.classList.add('dark');

const bookmarkButton = document.getElementById('bookmarkButton');
const saved = localStorage.getItem('maulid-bookmark') === 'saved';
bookmarkButton.classList.toggle('saved', saved);
bookmarkButton.textContent = saved ? '★ Penanda tersimpan' : '☆ Simpan penanda';
bookmarkButton.addEventListener('click', () => {
  const isSaved = localStorage.getItem('maulid-bookmark') !== 'saved';
  localStorage.setItem('maulid-bookmark', isSaved ? 'saved' : 'unsaved');
  bookmarkButton.classList.toggle('saved', isSaved);
  bookmarkButton.textContent = isSaved ? '★ Penanda tersimpan' : '☆ Simpan penanda';
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('.kitab-page')];
const tocLinks = [...document.querySelectorAll('.toc-link')];
const updateActive = () => {
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top < 240) current = section.id;
  }
  tocLinks.forEach(link => link.classList.toggle('selected', link.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();
