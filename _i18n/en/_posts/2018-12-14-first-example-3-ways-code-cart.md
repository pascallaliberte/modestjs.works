---
layout: post
title:  "First example: 3 ways to code a cart"
categories: book sample
author: Pascal Laliberté
---

As a first example, let's take a shopping cart. Like this one:

![cart example](/images/post/cart-example-01.jpg)

That whole page could be managed via a Single-Page Application (SPA), but let's see how to make this more modest. That means the markup will be prepared server-side, and we'll add behaviour via javascript.

On this page, there are two components in need of some added behaviour:

1. the `cart`, listing the items in the middle of the page, allowing the user to change the quantity of each item
2. the `cart-quantity`, in the top right, showing the overall quantity in the cart

Modern JS allows us to define the javascript code for each component separately, and then combined together using a compiler like webpack, and so that's what we'll do.

## Strategy 1: Vanilla JS

All of the interactivity is bound to the quantity field. Changing the quantity will trigger these updates:

* the item's subtotal will be updated;
* the cart's subtotal will be updated too;
* the `cart-quantity` will also need to be updated.

The first challenge will be to update the `cart-quantity`.

Since the `cart-quantity` will be defined separately, we'll use event listeners so we can broadcast the `newQuantity` and have the `cart-quantity` receive it.

```js
// cart-quantity.js

const cartIconQuantitySelector = '[data-behavior="cart-icon-quantity"]'

// listen for the event
document.addEventListener('cart-quantity-updated', (event) => {
  if (!event.detail || !event.detail.newQuantity) return
  
  // find the cart-quantity element on the page
  const cartQuantityEl = document.querySelector(cartIconQuantitySelector)
  
  if (!cartQuantityEl) return
  
  // replace the text with newQuantity
  cartQuantityEl.textContent = event.detail.newQuantity
})

```

That means that within `cart.js`, we'll dispatch that event when any quantity is changed.

```js
// cart.js 
function broadcastNewCartQuantity() {
  
  // let newQuantity = ...
  
  const event = new CustomEvent('cart-quantity-updated', { 
    detail: {
      newQuantity,
    },
  });
  
  document.dispatchEvent(event)
}
```
