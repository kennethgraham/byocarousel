import Slider from './slider.js';

const sliderEl = document.querySelector('.slider');
const activateButton = sliderEl.querySelector('.slider__activator');
const sliderList = sliderEl.querySelector('.slider__list');
const prevButton = sliderEl.querySelector('.slider__control_type_prev');
const nextButton = sliderEl.querySelector('.slider__control_type_next');
const prevPageButton = sliderEl.querySelector('.slider__control_type_prev-page');
const nextPageButton = sliderEl.querySelector('.slider__control_type_next-page');
const currentTextbox = document.querySelector('#current');
const gotoTextbox = document.querySelector('#gototextbox');
const gotoButton = document.querySelector('#gotobutton');

sliderList.addEventListener('init', (e) => {
	const slider = e.detail;
	sliderList.classList.add('slider__list_active');

	// non-slider events
	prevButton.addEventListener('click', (e) => {
		slider.prevSlide();
	});
	nextButton.addEventListener('click', (e) => {
		slider.nextSlide();
	});
	prevPageButton.addEventListener('click', (e) => {
		slider.prevPage();
	});
	nextPageButton.addEventListener('click', (e) => {
		slider.nextPage();
	});
	gotoButton.addEventListener('click', (e) => {
		slider.slide = gotoTextbox.value;
	});

	// slider events
	sliderList.addEventListener('change', (e) => {
		currentTextbox.value = e.detail.new.index;
		e.detail.old.el.classList.remove('slider__item_current');
		e.detail.new.el.classList.add('slider__item_current');
	});

	sliderList.addEventListener('slideClick', (e) => {
		slider.slide = e.detail.slide.index;
	});

	// set initial slide
	slider.slide = 1;
});

activateButton.addEventListener('click', (e) => {
	const slider = new Slider(sliderList);
	// slider could be used here too, instead of in the init handler
	e.target.disabled = true;
});