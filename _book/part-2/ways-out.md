---
layout: book
title: Getting to More Modest Javascript
index: 57
part: 2
image: /assets/images/book/part-2-ways-out.jpg
---

Here are a few starting points and some ways out from each:

## We've got a web-based React SPA in production using GraphQL, and we're on our third episode where we were caught with some surprises maintaining it.
{: .question#spa-with-surprises }

Maybe it's that you did one too-many upgrades that ended up in a painful dependency nightmare.

Maybe it's that one of your team members quit, and it's been hard to fill the void.

Or maybe it's that you need to spend too much time optimizing the JS payload on first load vs having a flexible way to program your components.

A few ways out:

* Consider rewriting just one part of your app using server-generated views with no front-end React. Maybe generate server-side React views, and just add a few sprinkles, maybe Stimulus.
* Consider putting in a practice of vetting the packages your stack uses. See whether you'll likely have just a one-way relationship with the package, or whether your team can see itself investing back into that package. While you think this through, and for as long as you can, sit with the discomfort of knowing there are too many packages to give back to, and revisit the list frequently. Let that discomfort push you to invest back into the packages you use.
* If your company isn't on an insane release schedule that's fueled by rounds of investing, consider getting your dev team to be more involved in scoping ([shaping][shapeup]) the product's features. Get some of the language of "bets" and "scope hammering" into your practice. Get a practice to interview your recent buyers to understand the job-to-be-done of your app, [the "job" for which they "hired" your app when they purchased it][jtbd-intro].

[shapeup]: https://basecamp.com/shapeup/
[jtbd-intro]: https://sharpen.page/jtbd/intro-to-jobs-to-be-done-through-examples/

## We're just about to start a project, and our team is a little too excited about using an SPA.
{: .question#start-project }

* Before you settle on your stack, consider challenging the rest of the team to build a small prototype using both approaches: a Single-Page Application and a Multi-Page Application using sprinkles, [Turbo Drive (née Turbolinks)][turbodrive] and [Stimulus][stimulus].
* When you butt up against hypothetical "what if's" that nudge you to play safe and use the popular frameworks "just in case we get asked to do _this_", show your case that you can always add a page component that's more reactive if ever you need to, and how to wrap it properly to survive removal from/re-addition to the DOM.

[turbodrive]: https://turbo.hotwire.dev/handbook/drive
[stimulus]: https://stimulusjs.org

## Our team is intent on joining the trends so that they can build some open-source package for visibility.
{: .question#join-trends-for-visibility }

* Consider persuading them to build something counter-cultural instead, and make a bigger splash with less effort.
* Consider modelling a more modest approach by encouraging to have the debate out in the open on your blog or on dev.to. Have different members of your team publicly voice their opinion, in reply to the main post, where you're announcing the discernment of tech stack that you're going through. It'll create some vulnerability, and surely attract like-minded people that also want to avoid playing the game everyone else is playing.

---

Regardless of the situation you're in, remember that even if you're the one in charge of the team, your ideas still needs _selling_. And for that, it pays to build empathy for the kind of progress each person is trying to make in their jobs (see the [Chapter on Selling][selling]). Some of your best developers really do want to have something trendy on their resume -- that is the idea they're married to, the [orbit they'll always be coming back down to][change-orbit].

[selling]: /book/part-1/learn-to-sell
[change-orbit]: https://sharpen.page/jtbd/changing-orbit-selling-your-idea/

Also, remember to manage your ego and rewrite your convictions as they come up (see the [Chapter on What Leadership Does][leadership]). You might not be able to make a fast enough change where you are, but maybe you can make a small change that'll make the biggest difference. You just need to get your ego out of the way so you can detect when it's time to make that small change.

[leadership]: /book/part-1/what-leadership-does

If it's any help, I've put together a series of videos on YouTube on how to [Change Situations Using Mental Reprogramming On Yourself][mental-reprogramming]. Five different situations, ranging from professional to personal, are presented, where I combine the techniques of managing your mental models (convictions) and using a kind of visualization rewriting to make you into the kind of person that makes the smallest, most impactful move to change a situation.

[mental-reprogramming]: https://www.youtube.com/watch?v=9juE2GI6gwo&list=PLsWRsvsqkNurMF8nWzWi7yAXM7G7phD-_
