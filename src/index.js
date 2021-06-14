import './sass/main.scss';
import ImagesApiService from './js/apiService';
import getRefs from './js/getRefs';
import imageCardTpl from './templates/imageCard.hbs';

const refs = getRefs();
const imagesApiService = new ImagesApiService();

refs.form.addEventListener('submit', onFormSubmit);
refs.btn.addEventListener('click', onBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  imagesApiService.query = e.currentTarget.elements.query.value;
  renderGalleryImages();
}

function onBtnClick(e) {
  imagesApiService.incrementPage();
  renderGalleryImages();
}

function renderGalleryImages() {
  imagesApiService.fetchImages().then(images => {
    const imagesMarkup = imageCardTpl(images);
    refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
    refs.btn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}
