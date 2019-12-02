---
layout: book
title: A Modest Stack
index: 15
part: 1
image: /assets/images/book/part-1-a-modest-stack.jpg
---

When we're talking about modest JavaScript, we're mostly talking about modest CSS and modest HTML. When it comes to mobile native, that also means keeping to modest native elements too.

Keeping the CSS modest means that it doesn't need to be optimized to work with hundreds of developers. It means keeping it where it's always been, mostly in its own CSS files. It also means keeping the CSS to affect the presentation, and keep the JS to affect the behaviour. Separation of concerns.

Keeping the HTML modest means that it's either rendered server-side, or it's scoped to be updated only in spots. MPAs (Multi-page apps) do just fine.

## Can You Make a Modest Single-page App?
{: #modest-spa }

If you're building an SPA to be like everyone else. Please reconsider.

If you're building an SPA because all you have is a JSON API endpoint, you can still build a multi-page app to consume that API and serve server-side generated HTML. Node.js or Go would be nice and speedy for this.

**If you've figured out a way to build an SPA that's the best approach to serve your users, that won't be broken in 6 months from dependencies breaking, that won't require a huge team to maintain, and that is clever in its simplicity, you're on the right track to make a modest SPA.**

So yes, you can make a modest SPA. But there are more modest ways to build an app.
