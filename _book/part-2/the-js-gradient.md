---
layout: book
title: The JS Gradient
index: 54
part: 2
image: /assets/images/book/part-2-the-js-gradient.jpg
---

<aside markdown="1">
Note: Since originally writing this chapter, a new pretty awesome and _can't-get-any-more-modest-js-than-that_ approach called [Hotwire][hotwire] has dropped. Created by Basecamp and bundling Stimulus as one of its core parts, Hotwire is hot. It's a worthy replacement for all of the JS Gradient approaches mentioned below, up and including Stimulus. On top of Hotwire, if you need to have components with more interaction, you can skip straight to the [_Spot view-models_](#spot-view-models) heading below, which I'd recommend you instantiate wrapped inside a Stimulus controller.

[hotwire]: https://hotwire.dev
</aside>

If today, you were to start a new project _from scratch_, would you choose a front-end framework and build a single-page application? In some circles, that certainly feels like the default option. You get everything you need, you can build on what others have built, and it's trendy. As we've seen from the rest of the book, the default option isn't the _modest_ option. You're conjoined to a community that's ambitious, in a hurry and competitive. Your dependency stack is tall and brittle, and the toolkit's size is **disproportionate to your needs and the needs of your users**.

There is, however, a way to build apps, today, using _modern_ JavaScript, but that uses more modest practices.

In the last chapter, we've covered three ways to build modest JavaScript: Sprinkles, [Stimulus][stimulus] and Spot view-models.

Can we use all three in the same project? **You bet.** Know the basics of how the browser works, and the three build up on each other.

**It won't feel like you're learning three distinct approaches, it'll feel like a gradient of options.**

[stimulus]: https://stimulusjs.org

A broader question: What would a new app look like if we were to build it with all three approaches? What are the thresholds where one approach wins over another? Let's find out.

---

A new app, built using modest (yet modern) JavaScript, could look like this:

* Mostly server-generated HTML and CSS;
* Globally, some JavaScript is sprinkled to enhance certain interactions that occur on most pages (Global Sprinkles);
* In some areas, we define how specific sections of the HTML are augmented with JavaScript (Component Sprinkles, Stimulus)
* In some areas, JavaScript is used to more deeply morph the view based on user interactions and changes to the data (Stimulus, Spot view-models);
* In some areas, whole sections of a page are taken over by JavaScript (Spot view-models);
* For other more deeply interactive uses, whole pages are taken over by JavaScript (SPAs).

I call this approach **the JS Gradient**.

## Stated Ideals

At the outset, let's highlight some of the ideals we're shooting for:

1. **We will prefer server-generated HTML.** Whether from a full page render, or if fetching just a fragment of the page, our approach will prefer server-generated HTML over JavaScript-generated HTML. As each additional level of JavaScript in the JS Gradient gets more involved, we'll move away from that ideal, but we'll start from that goal post.
2. **The HTML on a page can be swapped out and replaced on a whim.** This will allow us to use techniques like `pjax` (replacing the whole body of a page with new HTML) and `ahah` (asynchronous HTML over HTTP, to replace parts of a page with new HTML). This gives us the ability to make the app feel really fast, while keeping the HTML generated server-side. To do this, we'll need to make sure that when custom event handlers are added on specific elements, they should be removed when the element is removed from the page. The best way to do this is by specifying event handlers on the whole document and watching to see if they were fired by a certain element. The next best way is to use Stimulus, as it coordinates the addition and removal of event handlers as elements are detected as being added or removed from the page. This ideal disqualifies many jQuery-based plugins that don't offer a `destroy()` method. This also means that if the Back button is pressed, the UI gets brought back, in situations where pjax is used. This means that if we're loading a spot view-model which sets up its own event handlers on elements, it needs to work when the previous page comes back into view. We'll talk about how to do that below.
3. **We will favor the use of native Browser APIs.** The browser offers a ton of functionality for free and older browsers can be patched using polyfills. CSS and its cascade. The History API. Native form elements. Custom event handlers. `querySelector` and `querySelectorAll`. jQuery is actually fine. It's just not necessary anymore. Best to use the real stuff.

With those stated, let's start with the most lightweight of all JavaScript enhancements: global sprinkles. We'll then move our way up to more sophisticated JS approaches.

## Global Sprinkles
{: #global-sprinkles }

The sprinkles approach, as stated in the last chapter, has two main tools:

1. Adding event listeners, preferably caught all the way up at the document level instead of on the element itself, to catch user interactions and respond with...
2. Making small updates to the page's elements -- adding or removing classes, changing text in places, modifying element attributes.

Global sprinkles are the type to add general app-level behaviour enhancement using JavaScript. Things like: collapsable sections like dropdowns and accordions, navigating form fields with arrow keys in a table grid, augmenting forms to submit via ajax, fetching and inserting page fragments into the page from the server.

Rails, in particular, has a suite of helpers in its `rails-ujs` (unobtrusive js) package, which qualifies here as a global sprinkles package.

Other global sprinkles tools I've heard of but haven't used: [Trimmings][trimmings], and [intercooler.js][intercooler] which for the moment still depends on jQuery.

[intercooler]: http://intercoolerjs.org

<aside markdown="1">
### Making it comply with ideal #2 "The HTML on a page can be swapped out and replaced on a whim"
{: #global-sprinkles-with-ideal-swapping-html-on-a-whim }

Just ensure that event handlers are specific and caught at the document level, as opposed to being set on the element itself, and you'll be fine.

[Bootstrap][bootstrap], it should be noted, has _most_ of its JS components satisfy this ideal (I think with the exception of tooltips and another one I can't remember), and would be considered a global sprinkle you could add to your project (even if it defines many component sprinkles into one global package.)

[bootstrap]: https://getbootstrap.com/
</aside>

### The threshold: When you might consider looking for something else
{: #global-sprinkles-threshold }

* You find yourself globally defining some sprinkles that are tied to a specific component, and you'd like to define that component it in its own `.js` file. See [_Component Sprinkles_](#component-sprinkles) below.
* You find wanting to define event handlers on specific elements, rather than catching them at the level of the document. See [_Stimulus_](#stimulus) below.

## Component Sprinkles
{: #component-sprinkles }

When you find yourself wanting to have a specific page component's behaviour defined in a single `.js` file, you turn to the component sprinkles approach.

We're again using event handlers that are ideally specified at the global document level, and we're making small changes to the page elements when those user interaction events are fired.


```js
function enableQuantityFields() {
  document.addEventListener('change', (event) => {
    // make sure the change event came from the quantity field
    if (event.target.getAttribute('data-behavior') !== 'cart-item-quantity') return
    updateItemSubtotal(event)
    broadcastNewCartQuantity()
  })
}

enableQuantityFields()
```

**Tip**: instead of checking if the event was fired on an element with a certain `id` (which can only be defined once on a page) or with a certain `class` (which is preferably used for assigning styling), it's better to add a `data-behavior` attribute to the element, and giving it a name reserved for the JavaScript world. In the case above: `<input type="number" data-behavior="cart-item-quantity">`

### Making bigger changes to the HTML
{: #component-sprinkles-bigger-dom-changes }

Although sprinkles are meant to just make modest changes to the HTML (adding or removing classes, changing text or input field values), there might come a time when you need to update more of the HTML in response to a user interaction.

Examples and strategies:

* You want to add a section of a form when pressing a + (plus) button. You could have the additional form hidden from view and shown on click. Better yet, this "new item" form could be duplicated and inserted in the right place. The global event handler will take care of picking up the new form elements automatically.
* You want to add some validation messages on form fields. You could generate a small snippet of HTML (e.g. `<div class="field-validation field-validation-error">${message}</div>`) and insert it into the DOM in the right place.
* You want to re-organize the order of a list. You could simply change the order the elements in the DOM by removing them from the DOM into an array, changing the order of the elements, and re-inserting the new elements into the DOM.
* You want to replace a part of the HTML with something new. You could send an update to the server to communicate a change to the information generating the HTML, and have the server regenerate a new version of that part of the page.

There are some packages that help ease the generation of HTML. I know of (but haven't used): [HyperHTML][hyperhtml] and [Svelte][svelte].

[hyperhtml]: https://viperhtml.js.org/hyper.html

### The threshold: When you might consider looking for something else
{: #component-sprinkles-threshold }

* You find yourself setting up a lot of global event handlers, and it's getting cumbersome to organize them in your code. See [_Stimulus_](#stimulus) below;
* You find yourself needing to set up event handlers on specific elements, and setting them up on the global document is no longer possible or elegant. See [_Stimulus_](#stimulus) below;
* Making small edits to the HTML or refetching the HTML from the server-side is no longer feasible. See [_Spot view-models_](#spot-view-models) below.

## Stimulus - or Automated Behavior Orchestration
{: #stimulus }

I haven't found anything else quite like [Stimulus][stimulus]. Made by [Basecamp][basecamp], which they use throughout their own product, it's a novel approach that pairs a small JavaScript controller with your HTML. The Stimulus controller wires up behaviour (adds event handlers) to elements in your HTML. Elements in your HTML state which controller to use, and which controller actions to use when events occur.

[basecamp]: https://basecamp.com

For example, here's some HTML written to tell a Stimulus controller what to do:

```html
<div class="col text-right"
 data-controller="cart-quantity"
 data-action="cart-quantity-updated@document->cart-quantity#updateQuantity">
  Cart: <strong data-target="cart-quantity.quantity">2</strong>
</div>
```

It says the following:

* As defined in the `data-controller` attribute: this `<div>` is controlled by a controller called `cart-quantity`.
* As defined in the `data-action` attribute: when the `cart-quantity-updated` event is caught on the `document`, fire the `cart-quantity` controller's method called `updateQuantity`.
* As defined in the `data-target` attribute: this `<strong>` element can be referenced in the `cart-quantity` controller as the `quantity` element (or "target").

And here's the controller. A single method is defined, and it updates the quantity target.

```js
// cart-quantity_controller.js
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["quantity"]
  
  updateQuantity(event) {
    if (!this.hasQuantityTarget) return
    
    if (!event.detail || !event.detail.newQuantity) return
    
    this.quantityTarget.textContent = event.detail.newQuantity
  }
}
```

You can go further.

You can automatically add event handlers to input fields. You can have event handlers affect more than one controller at a time. The HTML defines what JS should be fired, and the JS just responds automatically.

Here's a bit of server-generated HTML whose behaviour will be automatically orchestrated via Stimulus:

```html
<input type="number" value="1" 
 data-target="cart-item.quantity cart.quantity"
 data-action="change->cart#updateSubtotal change->cart-item#updateSubtotal change->cart#broadcastNewQuantity"
 data-item-price="13.99"
 />
```

In the case above, the `input` is known as the `quantity` target by both the `cart-item` and `cart` controllers. On `change`, three methods will fire from those two controllers. The controllers will know how to update the subtotals by using the `value` attribute combined with the `data-item-price` attribute.

The magic of Stimulus, however, lies in this one trick:

**As elements appear or disappears from the page's HTML, event handlers are automatically added to and removed from the elements**. This spares you having to define global event handlers manually, and it makes Stimulus controllers a lot of fun to write.

### The threshold: When you might consider looking for something else
{: #stimulus-threshold }

* Making small edits to the HTML or refetching the HTML from the server-side is no longer feasible. For example, you have a complex form with a lot of permutations, and generating the HTML manually would be too much of a hassle. See [_Spot view-models_](#spot-view-models) below.
* I just have a JSON API endpoint for that section of my app and it would be easiest if I didn't have to generate server-generated views. See [_Spot view-models_](#spot-view-models) or [_SPAs_](#spa) below.

<aside markdown="1">
### Aside: Is Stimulus used in a production app?
{: #stimulus-used-in-prod }

Stimulus is used in the latest version of Basecamp. On Stimulus' own community forum, there's a [thread on community members' projects built for or with Stimulus][built-with-stimulus].

[built-with-stimulus]: https://discourse.stimulusjs.org/t/post-your-examples-or-open-source-projects/125/20
</aside>

## Spot view-models
{: #spot-view-models }

Today's most popular view-models are [React][react] and [Vue][vue]. They both offer a way to define a template that will be used to create HTML, a way to morph that HTML based on changes to JavaScript objects holding a "state", and offer efficent ways (namely, DOM-diffing) to update the HTML on-the-fly as those changes to the "state" are detected.

[vue]: https://vuejs.org
[react]: https://reactjs.org

Famously, React is used in Single-Page applications (SPAs). Vue also has a large user-base building Single-Page applications.

But for our modest needs, we'll prefer the use of spot view-models. **That is, view-models that are just used in specific spots.** We're not taking over the whole page here, we're just augmenting a certain page section with a data-reactive view-model.

As stated under the "Threshold" sub-headers in the above strategies, spot view-models come in handy when:

* Making small edits to the HTML or refetching the HTML from the server-side is no longer feasible. For example, you have a complex form with a lot of permutations, and generating the HTML manually would be too much of a hassle.

My prefered toolkit for view-models is [Vue][vue]. Its community holds values that I find are more in line with mine. Vue is opinionated in its approach, and its approachable documentation is a sign of strong positions in favour of being a "Progressive JavaScript Framework". You can use it in modest ways, and that's why I'm picking it here.

The root HTML for the instance of the view-model is simple: just an empty div.

```html
<div
 data-behavior="cart-quantity"
 data-quantity="2"></div>
```

Which gets taken over (`mounted`) when the following JS is run (we use the same `data-behavior` attribute for the selector):

```js
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('[data-behavior="cart-quantity"]')
  if (!el) return
  
  new Vue({
    // inject a new fake element that will be converted to the Vue instance on mount
    el: el.appendChild(document.createElement('cart-quantity')),
    render: h => h(CartQuantity),
  })
})
```

The missing piece is that `CartQuantity` object, which holds the result of a larger `cart-quantity.vue` file. In true form for a spot view-model within a larger page, it listens for the `cart-quantity-updated` page-level event to update its inner `quantity` state property.

```vue
<template lang="html">
  <span>
    Cart: <strong>{% raw  %}{{ quantity }}{% endraw %}</strong>
  </span>
</template>

<script>
export default {
  data() {
    return {
      quantity: {}, // changes to the quantity will change 
                    // the html automatically, according to the template
    }
  },
  mounted() {
    this.quantity = JSON.parse(this.$el.parentNode.getAttribute('data-quantity'))
    
    // as this view-model is initialized (mounted), we listen for updated 
    // quantity events
    document.addEventListener('cart-quantity-updated', this.getNewQuantity)
  },
  beforeDestroy() {
    // because we manually added an event listener, we need to remove it
    // before we destroy the vue
    document.removeEventListener('cart-quantity-updated', this.getNewQuantity)
  },
  methods: {
    getNewQuantity(event) {
      if (!event.detail || !event.detail.newQuantity) return
      this.quantity = event.detail.newQuantity
    }
  }
}
</script>
```

Although this example is simplistic, the Vue `<template>` is where you could have more intricate logic (`if-else` branches, `for` loops) to change the HTML as the state objects change (which would include more than a single `quantity` property.)

I know but haven't tried these other (even more modest) view-models: [Reef][reef] (by [Chris Ferdinandi][cferdinandi] or _Vanilla JS_ fame), and [Svelte][svelte].

[reef]: https://github.com/cferdinandi/reef
[cferdinandi]: https://gomakethings.com
[svelte]: https://svelte.dev

<aside markdown="1">
### Making it comply with ideal #2 "The HTML on a page can be swapped out and replaced on a whim"
{: #spot-view-models-with-ideal-swapping-html-on-a-whim }

Here's the problem with view-models: they're a mesh of event handlers and data mutation hooks. If you clone the HTML they output, that HTML will no longer "work". That's because all the event handlers are no longer hooked up right. This begs the question: How can we uphold the ideal of "The HTML on a page can be swapped out and replaced on a whim"?

Say you want to use a date-picker component off the web, and it's been built using a view-model.

You could use Stimulus to coordinate loading or destroying the component. The Stimulus component would be a wrapper around your component. Stimulus controllers have access to two special methods to help with this. `connect()` is called when the instance of the Stimulus component is detected being added on the page. `disconnect()` is called just before the Stimulus component will be removed from the page. To bring a Vue component right back in the exact state it was in before it was destroyed, you could serialize the component's state and store it in a `data` attribute on the parent element, to be used again on `connect()`, when it re-appears. For nested Vue components, it's a little trickier, but there's a way to serialize all sub-components.
</aside>

### The threshold: When you might consider looking for something else
{: #spot-view-models-threshold }

* The compiled JavaScript from the `.vue` files is too heavy for our needs. Downgrade to a [_Stimulus_](#stimulus) component, as described above.
* I'm ending up creating mostly empty pages that just contain the root HTML to mount my view-models on. I'm practically just using view-models for all of my page's elements. See [_SPAs_](#spa) below.
* I just have a JSON API endpoint for that section of my app and it would be easiest if I didn't have to generate server-generated views. See [_SPAs_](#spa) below.

## <acronym>SPAs</acronym> - Single-Page Applications
{: #spa }

A single-page application is typically ([see one notable exception in an aside below](#spa-server-generated-with-stimulus_reflex)) an all-JavaScript affair. Reactive view-models like Vue or React are the baseline. Whole pages are handled by view-models, and the browser's handling of clicks and the back button are overriden to serve different JavaScript-generated views to the user.

The resulting JavaScript payloads are typically large in size, affecting the performance of the first page-load. Browsers compensate by using a lot of battery-power to compute the rendering of the views. And if you want to tweak performance, there are even more clever JavaScript methods to use, including view-models that are pre-rendered on the server-side and then hydrated using fresh JSON data. It's JavaScript all the way down.

As mentioned above in some of the "Treshold" sections, it's worth noting _when_ pulling an SPA approach into a project might make sense:

* I'm ending up creating mostly empty pages that just contain the root HTML to mount my view-models on. I'm practically just using view-models for all of my page's elements.
* I just have a JSON API endpoint for that section of my app and it would be easiest if I didn't have to generate server-generated views.

There are other situations when an SPA might make sense, which we haven't mentioned:

* What I'm building is using very complex views (for example: a graphics editor or a tool for complex collaboration workflows).
* The data I'm using is encrypted on the server-side, and decrypted on the client. The server itself can't decrypt the information before it's sent back to the browser, so server-generated HTML views can't be easily built, so we're using a JSON feed.

An SPA is the least modest JavaScript approach. Using it as the default approach is indicative of a lack of options, but there are occasions when it's the best approach.

<aside markdown="1">
### Aside: A note on server-generated HTML when all you have is a JSON API endpoint.
{: #spa-not-necessary-for-json-api }

It's worth noting that you _can_ have server-generated HTML even if all you have is a JSON API endpoint. A node.js or Go app would be super speedy. Define the routes for the HTML views you want outputted, and fuel your HTML views with the result of fetching the data from JSON API as if it was coming from an ORM or a database.
</aside>

<aside markdown="1">
### Aside: Stimulus-based server-generated SPAs
{: #spa-server-generated-with-stimulus_reflex}

I mentioned [Hotwire][hotwire] in a note at the top of this chapter. Using its Turbo Drive (née Turbolinks) to replace full pages, its Turbo Frames and Turbo Stream to replace parts of the DOM using form responses, WebSockets or straight up polling, plus Stimulus for some extra interactivity in places, that'll get you pretty far in the pursuit of an SPA feel.

There's a Rails gem for creating stimulus-based server-generated single-page applications. It's called [stimulus_reflex][stimulus_reflex], and it has none of the baggage of the large-scale JavaScript-based view-model SPAs. A good-sized community has formed around it, but it'll be feeling competition from Hotwire's entry into the scene.

Another approach, which is modest and interesting, is called [Trimmings][trimmings].
</aside>

[trimmings]: https://postlight.com/trackchanges/back-to-html-introducing-trimmings
[stimulus_reflex]: https://github.com/hopsoft/stimulus_reflex

---

So there you have it. You can build apps that do a lot just by having a few JavaScript sprinkles. In spots when you need more interactivity (you need to coordinate adding/removing more event handlers), there's Stimulus. And for those spots where the view changes a lot depending on the data you receive, consider spot view-models or SPAs.
