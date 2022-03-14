import Slider from '/slider.js';

const sliderEl = document.querySelector('.slider');
const sliderList = sliderEl.querySelector('.slider__list');
const prevButton = sliderEl.querySelector('.slider__control_type_prev');
const nextButton = sliderEl.querySelector('.slider__control_type_next');
const thumbnailsEl = document.querySelector('.thumbnails');
const thumbnailsList = thumbnailsEl.querySelector('.thumbnails__list');
const thumbnailsPrevButton = thumbnailsEl.querySelector('.thumbnails__control_type_prev');
const thumbnailsNextButton = thumbnailsEl.querySelector('.thumbnails__control_type_next');

sliderList.addEventListener('init', (e) => {
	const slider = e.detail;
	sliderList.classList.add('slider__list_active');
	nextButton.classList.add('slider__control_active');
	prevButton.classList.add('slider__control_active');

	prevButton.addEventListener('click', (e) => {
		slider.prevSlide();
	});
	nextButton.addEventListener('click', (e) => {
		slider.nextSlide();
	});
	sliderList.addEventListener('slideClick', (e) => {
		slider.slide = e.detail.index;
	});
	sliderList.addEventListener('change', (e) => {
		e.detail.old.el.classList.remove('slider__item_current');
		e.detail.new.el.classList.add('slider__item_current');
	});
});

thumbnailsList.addEventListener('init', (e) => {
	const slider = e.detail;
	thumbnailsList.classList.add('thumbnails__list_active');
	thumbnailsNextButton.classList.add('thumbnails__control_active');
	thumbnailsPrevButton.classList.add('thumbnails__control_active');

	thumbnailsPrevButton.addEventListener('click', (e) => {
		slider.prevPage();
	});
	thumbnailsNextButton.addEventListener('click', (e) => {
		slider.nextPage();
	});
	thumbnailsList.addEventListener('slideClick', (e) => {
		slider.slide = e.detail.index;
	});
	thumbnailsList.addEventListener('change', (e) => {
		e.detail.old.el.classList.remove('thumbnails__item_current');
		e.detail.old.el.removeAttribute('aria-current');
		e.detail.new.el.classList.add('thumbnails__item_current');
		e.detail.new.el.setAttribute('aria-current', 'true');
	});

	slider.slide = 1;
});

const mainSlider = new Slider(sliderList);
const thumbnailsSlider = new Slider(thumbnailsList);

sliderList.addEventListener('change', (e) => {
	thumbnailsSlider.slide = e.detail.new.index;
});

thumbnailsList.addEventListener('change', (e) => {
	mainSlider.slide = e.detail.new.index;
});

