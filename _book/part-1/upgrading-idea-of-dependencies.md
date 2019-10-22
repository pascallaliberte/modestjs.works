---
layout: book
title: Upgrading (the idea of) dependencies
index: 5
part: 1
---

Add a dependency to your project. How does it feel? 

> "This is awesome, I've spared myself from writing all this functionality. I'm benefitting from all the work someone else put into it. This does the job well, let's roll with it."

The _idea_ of dependencies in software writing goes back a while. In JavaScript, packages are published on [npm][npm], the node package manager registry. Packages listed in the npm register can be quite small in size. That's because browsers had been slow updating their standard libraries, and so if you wanted some nice shortcuts for the language, you had to upgrade your stack with polyfills and libraries.

[npm]: https://www.npmjs.com

But being _dependent_, that's a concept with an even longer history. Including dependencies into your project feels like a win (all of this work you don't have to do), but _depending_ on other people's work doesn't feel so much like a win anymore. Being _dependent_: that doesn't feel good at all. That's because it has something to do with **immaturity**.

In his book _[Principle-Centered Leadership][covey]_, Stephen Covey (of the book _7 Habits of Highly Effective People_) uses the word _dependent_ on a "maturity continuum". There are two other stages, but let's start with the dependency stage.

[covey]: https://www.goodreads.com/book/show/44644.Principle_Centered_Leadership

(dependence →)

Being dependent is the most immature part of the maturity continuum, according to Covey. It's an immature stage because it's characterized by a dynamic of _blame_.

When someone operates in the dependency stage, their relationships are marked by the word "them". When something goes wrong, blame is cast on "them", the people or system on whom the person is dependent. Those who seek to evade blame are comfortable being dependent.

But for those who catch themselves in a blame mindset and know that a change is required, the next step is to replace the word "them" with something else: "me".

## Second Stage of Maturity: Independence

(dependence →  independence →)

Independence is an upgrade on dependence. I take up responsibility, I make choices that are separate from those of others. I'm not mingled with the problem, I'm distinct from it.

This change in relationship goes beyond "I'm writing my own components" -- our relationship to npm dependencies. It's, of course, applicable in any kind of relationship.

As an example: You can be independent in your career (by having enough marketable skills) but you can be _dependent_ in your relationship with your spouse (co-dependent if you're both dependent of each other in an immature way). You can be dependent in your relationship with your parents, or even in your relationship with your kids.

Upgrading just one of your relationships to an independence mindset (at least your end of it), requires a good amount of internal, emotional work.

As much work as it requires, and beyond its benefits compared to the dependence mindset, the independence mindset is a _temporary_, transient stage. It's not mature _enough_. "Me" is better than "them" for owning blame instead of avoiding it, but "me" rings hollow, self-centred. The next stage has a better word.

## Third State of Maturity: Interdependence.

"Us". In the most mature relationships, not only did the person conquer the temporary _independence_ stage, but that person has moved on to making other people's _environment_ more mature as a whole (for "us"), so people can navigate their way up from "them" to "me", and from "me" to "us" too.

(dependence → independence → interdependence)

If the interdependence mindset is about "us", how does that relate to today's software industry? In particular, how does it relate to JavaScript "dependencies"?

## Three Stages of JavaScript Dependencies

In the JavaScript world, here's what each stage look like:

* Dependence (them): I use dependencies but I blame others when something breaks or doesn't work as expected. I deflect blame. I hoard the credit.
* Independence (me): I cut ties with the dependencies and write my own parts. That requires me to understand things at a deeper level, and so I write fewer parts. I take the blame. I accept the credit.
* Interdependence (us): When I use tools from others, I choose those I can commit to invest in, so that it's a mutually benefitial relationship. Examples: I participate in the open-source development of those dependencies I use. I invest in the people I work with so they can get mature personally and within their work too. I share the credit.

It's hard to use dependencies in a mature way in the modern JavaScript world. Things go so fast. But knowing the lens of the maturity continuum, we can make some better calls and be more modest about the whole thing.
