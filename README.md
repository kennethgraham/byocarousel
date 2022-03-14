# Goal

An implementation-agnostic carousel library that causes no visible changes, but provides events, methods, and accessibility improvments to make development of a carousel easier.

# Setup

## Step 1: Create a carousel container with some slides in it.

```
<div id="foo">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</div>
```

## Step 2: Style it as a script-free scrollable carousel to your liking.

```
#foo {
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

#foo > * {
  display: block;
  flex-shring: 0;
  width: 40%;
  aspect-ratio: 16/9;
}
```

## Step 3: Import and instantiate the library

```
import Slider from '/slider.js';
const mySlider = new Slider(document.getElementById('foo'));
```

If you've set it up correctly, nothing should change.  What did you think this was, a full-featured library?

# Do everything else yourself

Slider makes it easier to write it yourself, at least.

## Move to a slide

You can tell it to move to a new slide:

```
mySlider.slide = i // Go to a specified slide
mySlider.nextSlide() // Go to the next slide
mySlider.prevSlide() // Go to the previous slide
```

These will change the current slide, and if it's not scrolled into view, will scroll to it.  If you reach the end, it'll go back to the other side.

Maybe hook these up to your own previous and next buttons.  Or do it on a timer if you hate your users, whatever, that blood's on your hands.

## Get the current slide number

```
mySlider.slide
```

## Scroll over a page

You can tell it to scroll a page over:

```
mySlider.nextPage() // Go to the next page
mySlider.prevPage() // Go to the previous page
```

These will not change the current slide.  They can be nice for carousels with multiple items visible.  If you reach the end, it'll go back to the other side.

## Attach events

Slider will also let you know when it does something.  Attach an event listener to the main element, and get some useful info back in e.detail:

```
document.getElementById('foo').addEventListener(eventName, (e) => {
  console.log(e.detail);
});
```

Here are the events and what they return:

### init

Fires when the slider has been set up.

Returns the slider instance.

Example uses:

 * Showing buttons that won't work until it's initialized.
 * Adding a class that hides the scrollbar.


### change

Fires when the current slide has been changed.

Returns:

```
{
  old: {
    index: [int], // The old slide number
    el: [node], // The slide's node
    visible: [boolean], // Whether the slide is fully scrolled into view
  },
  new: {
    index: [int], // The new slide number
    el: [node], // The slide's node
    visible: [boolean], // Whether the slide is fully scrolled into view
  }
}
```

Example uses:

 * Add a class to the current slide to visually highlight it.
 * Send an analytics tracking event.


### slideClick

Fires when a slide is clicked.

Returns:

```
{
  index: [int], // The slide number
  el: [node], // The slide's node
  visible: [boolean], // Whether the slide is fully scrolled into view
}
```

Example uses:

 * Set it as the current slide

### visibilityChange

Fires when a slide is scrolled into or out of view.

Returns:

```
{
  index: [int], // The slide number
  el: [node], // The slide's node
  visible: [boolean], // Whether the slide is fully scrolled into view
}
```

Example uses:

 * Automatically setting the visible slide to current in single-slide-per-page carousels.
 * Send an analytics tracking event.

