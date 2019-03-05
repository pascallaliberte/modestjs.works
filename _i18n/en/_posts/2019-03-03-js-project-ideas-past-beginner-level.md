---
layout: post
title: JS Project Ideas Once Past Beginner Level
functionalities: 
  - heading: User Interfaces (UIs)
    choices:
      - Basic Calculator
      - Questionnaire
      - Multi-range slider field
      - Copy to clipboard button
      - Side-scrolling game
      - Element re-ordering
      - HTML5 audio player controls
      - A canvas to draw on
  - heading: Animations
    choices:
      - Make a box resize on hover
      - Add a fade on loading a different part of the page
      - Bounce on object inside a box
      - Animate a splash animation inside a button on click
  - heading: Data Consumption
    choices:
      - Display Weather Data from a public API
      - "Perform Extract-Transform-Load: Modify data from one form to another"
      - Update a server via a GraphQL mutation
  - heading: DOM Traversal/Manipulation
    choices:
      - Insert an element at the end of a list
      - Insert an element at the beginning of a list
      - Wrap elements inside a wrapper
      - Find an ancestor of an element
  - heading: Event Handling
    choices:
      - Perform validation on leaving a field, on changing field content (with delay)
      - Upon one page component capturing user input, communicate the change to another component using a custom event handler
      - Ensure that an event handler is removed when element is removed from page, re-added when the element is re-added
approaches:
  - Vanilla JS / Native Browser APIs / CSS
  - Vue.js SPA (Single-Page Application)
  - In-spot Vue.js (just for that section of the page)
  - React SPA (Single-Page Application)
  - Stimulus JS
toolchains:
  - No toolchain - Scripts in the footer in global namespace
  - Gulp
  - Grunt
  - Webpack
syntaxes:
  - Common JavaScript
  - ES6
optimizations:
  - Minimize JS use (opt for CSS methods, minimize external packages)
  - Maximize use of npm packages (don't re-invent the wheel)
  - Minimize first-load time
  - Make it accessible for people with a visual disability
---

Let's say you just finished some beginner-level javascript tutorials and you'd like to learn more.

Here's a list of functionalities to pick from.

Below the functionalities, you'll fine some extra constraints: **approaches**, **toolchains**, **syntaxes**, and **optimizations**.

Happy Learning!

<aside 
  data-behavior="random-pick"
  data-title="Randomly Pick A Functionality And Constraints"
  data-description="Or if your prefer, here's a random selection of functionalities and contraints:"
  data-button-text="Give me a different selection">
<a href="{{ page.url }}">Visit the full article with javascript enabled for a randomizer</a>
</aside>

## 1. Choose a Functionality

{% for group in page.functionalities %}

### {{ group.heading }}

<ul>
  {% for choice in group.choices %}
  <li data-behavior="functionality" data-group="{{ group.heading }}">{{ choice }}</li>
  {% endfor %}
</ul>

{% endfor %}

## 2. Choose an Approach

<ul>
{% for choice in page.approaches %}
  <li data-behavior="approach">{{ choice }}</li>
{% endfor %}
</ul>

## 3. Choose a Toolchain

For transpiling, concatenation and minification.

<ul>
{% for choice in page.toolchains %}
  <li data-behavior="toolchain">{{ choice }}</li>
{% endfor %}
</ul>

## 4. Choose a Syntax

<ul>
{% for choice in page.syntaxes %}
  <li data-behavior="syntax">{{ choice }}</li>
{% endfor %}
</ul>


## 5. Choose an Optimization

<ul>
{% for choice in page.optimizations %}
  <li data-behavior="optimization">{{ choice }}</li>
{% endfor %}
</ul>

Hope this helps!

<script>
(function() {
  var randomPickerSelector = '[data-behavior="random-pick"]'
  var choices = [
    "functionality",
    "approach",
    "toolchain",
    "syntax",
    "optimization"
  ];
  var buttonIdentifier = 'random-pick-button';
  
  // scaffold the random picker html
  scaffoldRandomPicker();
  
  // get random set of options
  getRandomSet();
  
  // add event listener for the button, reset if already present (e.g. hmr, pjax)
  document.removeEventListener('click', buttonHandler);
  document.addEventListener('click', buttonHandler);
  
  function scaffoldRandomPicker() {
    var randomPicker = document.querySelector(randomPickerSelector);
    randomPicker.innerHTML = 
    '<p>' + randomPicker.getAttribute('data-description') + '</p>'
    + '<p><button data-behavior="' + buttonIdentifier + '" class="btn btn-secondary">' + randomPicker.getAttribute('data-button-text') + '</button></p>'
    + choices.map(function(choice) {
      return '<div data-behavior="proposed-' + choice + '"></div>';
    }).join('');
  }
  
  function getRandomSet() {
    choices.forEach(function(choice) {
      var container = document.querySelector('[data-behavior="proposed-' + choice + '"]');
      var optionsEls = document.querySelectorAll('[data-behavior="' + choice + '"]');
      
      if (!container || !optionsEls || 0 === optionsEls.length) return
      
      var options = Array.from(optionsEls).map(function(option) {
        return option.innerText
      });
      container.innerHTML = '<p><small class="text-uppercase">' + choice + ':</small><br>'
        + '<strong>' + getRandomOption(options) + '</strong>'
        + '</p>';
    });
  }
  
  function getRandomOption(options) {
    return options[Math.floor(Math.random() * options.length)];
  }
  
  function buttonHandler(e) {
    if (!e.target.hasAttribute('data-behavior')) {
      return
    }
    
    if (e.target.getAttribute('data-behavior') != buttonIdentifier) {
      return
    }
    
    getRandomSet();
  }
})()
</script>
