# ![a11y icon](https://github.com/gautiermichelin/a11y/blob/main/a11y_icon.png?raw=true) a11y-menu

The goal of this project is to bring to life in a single JS file an accessibility file, self loading.
It should bring these functionalities :
- ability to increase/decrease the font size, without zooming on the images, from 50% to 150% of the actual font size
- ability to fix single letter horizontal space to a single value, increasing readability for ppl that have difficulties to read, reading letter to letter
- ability to toggle the font family, to use at least one readable "sans" font, actually Open Sans (that could change in the future) ; and at least one specific font, OpenDyslexic
- this menu should insert at the top of the page, expanding full width (to be sure we don't break the current design of the page)

Screen capture : 
![screen capture of the accessibility menu](https://github.com/gautiermichelin/a11y/blob/main/menu_sample.png?raw=true) 

## How to use it

You need to import the 2 libs Cookies js and jQuery :
```html
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
Then you can import a11y-helper.js and a11y-helper.css :
```html
<script src="/path/to/a11_helper.js"></script>
<link rel="stylesheet" href="/path/to/a11_helper.css">
```

## Fix your CSS

Sometimes you have classes that "stick" on the top of the screen, for example a navbar or a sticky header.
You can fix this by adding a class to the element that you want to fix, and add this class to the CSS file.

This is the actual CSS for the navbar :
```css
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
```
Now, you need to make it go down for 100px to have enough space for the top accessibility menu.

```css
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.accessibility-menu-open .fixed-top {
  top: 100px;
}
``` 


