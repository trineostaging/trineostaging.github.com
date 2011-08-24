---
layout: post
title: "Javascript Remoting – a new Force unleashed in the Force.com world!"
date: 2011-08-15 13:56
comments: false
categories: 
- blog
---

Author [Luke McFarlane](http://trineo.co.nz/crew.html#lm)

One of the aspects of web application development I am really passionate about is creating user interfaces that are clean, simple, and intuitive to use. With the addition of a new exciting tool I have been able to deliver Force.com web applications that provide a much richer and faster user experience than ever before.

'Javascript remoting' was made available with the Summer '11 release of Force.com around about the middle of this year and allows fast, asynchronous communication between a Visualforce page and an Apex controller.

I have recently been doing some development for a company that sells ad placements on their website. Their sales team needed a custom Visualforce page where they could edit and reorder line items (ad placements) in a clean and efficient manner. By utilising the fantastic jQueryUI Sortable plugin to provide the client-side interaction and Javascript Remoting to update the sort order back to the server asynchronously, I was able to deliver a result that far exceeding their expectations.

After simply click and dragging a line item to a new position, a loading spinner above the list provides feedback that the new sort order is being updated in the database and then voila! The order the user sees on their screen is now what they will get when they create an invoice. No partial-page refreshes, no blocking the user interface while the page is talking back to the controller, and best of all it is FAST!

For more information:

# [Javascript Remoting for Apex](http://developer.force.com/releases/release/Summer11/JavaScript+Remoting+for+Apex)
# [Jquery UI](http://jqueryui.com/)


