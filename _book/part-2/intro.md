---
layout: book
title: Intro to Part 2
index: 42
part: 2
---

Part 1 was about general principles and some strong stances. We covered:

* How the JavaScript culture got too technical and lacked strong guiding principles;
* How being dependent marks a level of immaturity, that excessive usage of dependencies points to a lack of involvement in giving back to the packages you depend on;
* How the whole ecosystem is fueled by speed, ambition and attention, and that you choose not to play the game everyone plays;
* How immodesty was about being pompous, convoluted, inconsiderate and disproportionate, and how modest about being truthful, small, considerate and proportional.
* That you are more than just a developer, and that taking part in asking business questions can bring prosperity while keeping ambitions modest;
* How React, although popular, might not be a wise choice as the default front-end approach;
* That to build something, you'll need other abilities, like how to build an audience, how to sell, how to lead others, how be patient and how to stick around for the long haul for the benefits of good timing.

In Part 2, we'll look at concrete, technical ways to go forward. Plus, in the third chapter, we'll look at situations that you might be in, with some ways out.

First, some definitions:

* **SPA** - a Single-Page Application is built by having all of the views built to be handled within the context of one page. The browser's default handling of URLs is handled within the same single-page instance of the application, and views are defined in rendered JavaScript. [React][react], by convention, builds SPAs. [Vue][vue] can also be configured with routing and other add-ons to build SPAs. Without optimizations, SPAs produce a large initial JavaScript payload (a large initial .js file to download), makes the browser use more CPU and therefore makes the application expend more energy. It's worth noting that some SPAs can be made to use server-generated views. We'll cover those in The JS Gradient.
* **MPA** - by contrast, a Multi-Page Application is built to have each view served separately by the server. Some packages like [Turbolinks][turbolinks] (or its general technique called pjax) can be used to give the illusion of a snappy SPA-like experience, but at its core, the views are rendered on the server for each URL.
* **event handlers** - the browser allows the dispatching of custom events which can be caught by event handlers, executing some code on reception. This is used to catch clicks on a button or a link, changes to input fields, to do something in response to any type of other user interaction, and as we'll see, to alert other components on the same page of changes.
* **DOM** - The Document Object Model is the browser's internal representation of the elements rendered on the page: its HTML hierarchy, each element's attributes and properties, the relationship between elements (parent, child) and so on. Making changes to the DOM means making changes to the elements on a page and its properties. Typically small DOM changes include changing an element's class will change how it's presented, changing a value of an input field or changing the text in one element. Larger changes include changing whole sections, lists or a series of its sub-items.
* **view-model** - a way to define, using JavaScript, a template representing the HTML to be rendered along with some data properties that, when modified, morphs the HTML rendered from the template. [React][react] and [Vue][vue] are both designed as view-models.
* **state** - an underlying representation of the data that is used to make changes to the view. In the case of a view-model, the state is the data that, if changed, automatically produces changes in the view. Otherwise, in the case of server-generated views, the state would be directly defined in the properties of elements (e.g. the value of an input, or the `data-*` attributes of an element), read in-place following a user interaction.
* **dependency** - an external package defined in a `packages.json` file, that's installed into the project and available to be included into the rest of the JavaScript (normally via an `import` statement).
* **JSON API endpoint** - a location at a URL that returns data from a back-end resource that's in the JSON format (JavaScript Object Notation). This is usually used in combination with a view-model, where the data in JSON format is used to update the view-model's state, which changes the view. For server-generated view, a location at a URL could be made to return just the partial HTML for the new view to be shown, in which case, it would be called an "endpoint returning a view partial".

[react]: https://reactjs.org
[vue]: https://vuejs.org
[turbolinks]: https://github.com/turbolinks/turbolinks
