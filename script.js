const magazineURL = 'https://vilmaroliveira2026-wq.github.io/vozes-do-eja';
document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.mobile-menu').open = false;
  window.print();
}));
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.mobile-menu').open = false;
}));
document.getElementById('share-link').addEventListener('click', async () => {
  const status = document.getElementById('share-status');
  try {
    await navigator.clipboard.writeText(magazineURL);
    status.textContent = 'Link copiado. Você já pode compartilhar a revista.';
  } catch {
    status.replaceChildren(document.createTextNode('Copie este endereço: '));
    const link = document.createElement('a');
    link.href = magazineURL;
    link.textContent = magazineURL;
    link.style.overflowWrap = 'anywhere';
    status.append(link);
  }
});

const galleryLinks = [...document.querySelectorAll('.gallery-open')];
const albumDialog = document.getElementById('album-dialog');
const albumImage = document.getElementById('album-dialog-image');
let currentPhoto = 0;

function displayAlbumPhoto(index) {
  currentPhoto = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[currentPhoto];
  const figure = link.closest('figure');
  albumImage.src = link.href;
  albumImage.alt = link.querySelector('img').alt;
  document.getElementById('album-dialog-title').textContent = figure.querySelector('h3').textContent;
  document.getElementById('album-dialog-caption').textContent = figure.querySelector('.album-caption p').textContent;
  document.getElementById('album-dialog-count').textContent = `Foto ${currentPhoto + 1} de ${galleryLinks.length}`;
}

galleryLinks.forEach((link, index) => link.addEventListener('click', event => {
  if (typeof albumDialog.showModal !== 'function') return;
  event.preventDefault();
  displayAlbumPhoto(index);
  albumDialog.showModal();
}));
document.querySelector('.album-close').addEventListener('click', () => albumDialog.close());
document.getElementById('album-previous').addEventListener('click', () => displayAlbumPhoto(currentPhoto - 1));
document.getElementById('album-next').addEventListener('click', () => displayAlbumPhoto(currentPhoto + 1));
albumDialog.addEventListener('click', event => {
  if (event.target === albumDialog) {
    const bounds = albumDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) albumDialog.close();
  }
});
albumDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); displayAlbumPhoto(currentPhoto + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); displayAlbumPhoto(currentPhoto - 1); }
});
