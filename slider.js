export default class Slider {
  constructor(el) {
    this._el = el;
    this._slides = el.children;
    this._slides = [];
    this._initialized = false;
    el.setAttribute('role', 'region');
    Array.from(el.children).forEach((slideEl, i) => {
      const newSlide = {
        'index': i + 1,
        'visible': false,
        'el': slideEl
      };
      this._slides.push(newSlide);
      newSlide.el.addEventListener('click', (e) => {
        this._trigger('slideClick', newSlide);
      });
      if (newSlide.el.getAttribute('role') === null) {
        newSlide.el.setAttribute('role', 'group');
      }
      if (newSlide.el.getAttribute('aria-label') === null) {
        newSlide.el.setAttribute('aria-label', `Slide ${i + 1}`);
      }
      newSlide.el.setAttribute('aria-hidden', 'false');
      (function(newSlide, slider) {
        const slideObserverOn = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const intersection = Math.round(entry.intersectionRatio * 100);
            const isVisible = intersection >= 99;
            newSlide.visible = isVisible;
            if (isVisible) {
              newSlide.el.setAttribute('aria-hidden', 'false');
            } else {
              newSlide.el.setAttribute('aria-hidden', 'true');
            }
            slider._trigger('visibilityChange', newSlide);
          });
        },{
          'threshold': [0, .01, .99, 1]
        });
        slideObserverOn.observe(newSlide.el);
      })(newSlide, this);
    });
    this._currentSlide = null;
    this._initialized = true;
    this._trigger('init', this);
  }

  _trigger(eventName, payload) {
    const event = new CustomEvent(eventName, {
      detail: payload
    });
    this._el.dispatchEvent(event);
  }

  _getSlide(i) {
    const slide = this._slides[i - 1];
    console.log(`getSlide(${i})`, slide);
    return slide;
  }

  _getNextSlide(slide) {
    let nextSlide = null;
    if (slide.index < this._slides.length) {
      nextSlide = this._getSlide(slide.index + 1);
    } else {
      nextSlide = this._getSlide(1);
    }
    console.log(`getNextSlide(${slide.index})`, nextSlide);
    return nextSlide;
  }

  _getPrevSlide(slide) {
    if (slide.index > 1) {
      return this._getSlide(slide.index - 1);
    } else {
      return this._getSlide(this._slides.length);
    }
  }

  getNextInvisibleSlide() {
    let lastVisibleSlide = this._currentSlide;
    this._slides.forEach(slide => {
      if (slide.visible) {
        lastVisibleSlide = slide;
      }
    });
    const nextInvisibleSlide = this._getNextSlide(lastVisibleSlide);
    console.log(`getNextInvisibleSlide()`, nextInvisibleSlide);
    return nextInvisibleSlide;
  }

  getPrevInvisibleSlide() {
    let firstVisibleSlide = null;
    this._slides.slice().reverse().forEach(slide => {
      if (slide.visible) {
        firstVisibleSlide = slide;
      }
    });
    return this._getPrevSlide(firstVisibleSlide);
  }

  _scrollPageLeftToSlide(slide) {
    this._scrollRightToSlide(slide);
  }

  _scrollPageRightToSlide(slide) {
    this._scrollLeftToSlide(slide);
  }

  _scrollRightToSlide(slide) {
    if (!slide.visible) {
      const sliderWidth = this._el.offsetWidth;
      const sliderLeft = this._el.offsetLeft;
      const slideWidth = slide.el.offsetWidth;
      const slideLeft = slide.el.offsetLeft;
      this._el.scrollLeft = slideWidth + slideLeft - sliderWidth - sliderLeft;
    }
  }

  _scrollLeftToSlide(slide) {
    if (!slide.visible) {
      const sliderLeft = this._el.offsetLeft;
      const slideLeft = slide.el.offsetLeft;
      this._el.scrollLeft = slideLeft - sliderLeft;
    }
  }

  prevPage() {
    this._scrollPageLeftToSlide(this._getPrevInvisibleSlide());
  }
  nextPage() {
    this._scrollPageRightToSlide(this._getNextInvisibleSlide());
  }
  prevSlide() {
    this.slide = this._getPrevSlide(this._currentSlide).index;
  }
  nextSlide() {
    this.slide = this._getNextSlide(this._currentSlide).index;
  }
  get slide() {
    return this._currentSlide.index;
  }
  set slide(newSlideNumber) {
    newSlideNumber = parseInt(newSlideNumber);

    const initial = this._currentSlide === null;
    const newSlide = this._getSlide(newSlideNumber);
    const oldSlide = this._currentSlide || this._slides[0];

    if (initial || newSlide.index !== oldSlide.index) {
      this._currentSlide = newSlide;

      if (this._initialized) {
        if (initial || oldSlide.index < newSlide.index) {
          this._scrollRightToSlide(newSlide);
        } else {
          this._scrollLeftToSlide(newSlide);
        }
      } else {
        this._el.scrollLeft = 0;
      }

      this._trigger('change', {
        'old': oldSlide,
        'new': newSlide
      });
    }
  }
};
