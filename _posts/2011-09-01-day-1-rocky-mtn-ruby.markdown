---
layout: post
title: "Day 1 Rocky Mountain Ruby 2011"
date: 2011-09-01 08:55
categories: 
- blog
---

## A quick writeup on the talks given at RockyMtnRuby

Not exhaustive, not complete, but just a few notes about what stuck in my mind
as people gave excellent talks...

## Focus by Mike Gerhard

    Find focus.  Right/rich brain, left/linear brain.  Allow your right/rich brain the space to solve problems.

    Mike led us through a basic meditation exercise, and I for one struggle to focus and gradually my mind settled!

    Excellent way to set motivation for the conference.  Focus!

## Code Blindness by Michael Feathers

    Great way to communicate complexity and richness of code to business in a graphical manner - to show effect of touching specific areas of a codebase.  Conveys the ease/difficulty of changing a simple/complex codebase, such that business may ask how things became so complicated over time!

    Conway's Law, _Organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations._

    Michael's depth of experience in the software field comes through, as he walks us through how to try to reduce code blindness in an organisation.

## API Design Matters by Anthony Eden

    * APIs are the product
    * APIs outlive implementations

    Principals

    * APIs should be easy to learn, based on the principal of least astonishment
    * Should have readable code!
    * Should be easy to extend.  Design with growth in mind, not change.  Be ready to break your API into smaller APIs.
    * Should be hard to misuse.  Your client should not need to rely on side effects, or order.
    * APIs should be sufficiently powerful.  Should be as small as possible.

    Princpipals v2

    * Consistent concepts, naming, writing.  Introduce new concepts in a frugal fashion.
    * Clarity of code, and intent.
    * Convenient - should be easier for the masses to use your API as opposed to baking their own. Write your README first ... maybe ... :)
    * Concise, succinct APIs are good.
    * Complete

    Uses Net::HTTP as an example of a bad API, and Typhoeus/Faraday/OpenURI as examples of a good API.

    Separate the API and the Service Provider Interface (SPI)

    Learn from other great APIs.

## CRUD is not REST - Hypermedia for y'all - by Nick Sutterer

    * REST is an architectural style for distributed systems.
    * Machines talking to machines.
    * Quick walkthrough of components in REST.  A resource, and manipulation of the resource, via an interface that returns a representation of the resource.

    Neat example using his BURP app :)

    CRUD is not REST, since REST is more.  A number of distributed backend resources can be represented by multiple REST apps, and rendered by a frontend that renders the representations as required...I think thats what he's saying!

    Representaitons should include hypermedia - as links perhaps. Every hypermedia link should have

    * rel - link semantic or meaning
    * href - location
    * eg rel = self, href = /orders/1

    So, an order may have many 'beers' and also a link to 'self', while a collection of beers will have a link to 'self', as well as the 'order' that the collection belongs to.

    At any time, one can navigate through a sequence of events, extracting the links within representations to be able to manipulate or traverse resources.

    Worth checking out Nick's ROAR Gem.

## If you see the mountain lion, its too late - by Grant Blakeman

    Another talk using beer as the analogy.  I love it.  Excuse me here, I have little involvement in this space - trying to myself understand it at a high level.

    Indicators of balance in design - saying that there are many ingredients that come together to make a fine microbrew, which are being adjusted to yield a well brewed beer.

    Micro adjustments of balance stop problems from compounding.  To me this sounds like a common sense approach to tackling mostly anything.

    Allow natural constraints of a project to build your approach.

    Observe and be intentional about your process so you don't end up facing a big bad hungry hairy problem (mountain lion) - it might be too late.

## Exceptional Ruby by Avdi Grimm

    Avdi moved really fast through this - which was way too fast for me - so I grasped some of this, and realised I need to read his book!

    The $! global can be handy for a crash logger using at_exit, unless you close the program with exit! which wont call at_exit.

    Avdi showed a way of extending the exception constructor such that one can handle/look for nested exceptions by looking for the error.original parent error of an error.

    Add more context to an error:

    raise e, "Something useful to add here #{e.message}"

    In Ruby, the case and rescue statements are very similarly implemented, you can rescue a number of exceptions.

    Dynamic way to handle exceptions - stuff like "match any exception where the number of retries is less than 3".  Missed the code snippet on this...

    Read the book, this moved pretty fast - full of handy tips and new stuff.

## Matering the Ruby Debugger by Jim Weirich

    This man sang the awesome intro song. http://soundcloud.com/jim-weirich/rubycodinghigh-final

    Number one defence is TDD or BDD or (insert other test strategy).

    Number two is to use the ruby debugger.

    With put statements you're poking around one variable at a time.  Puts Driven Development is a poor cousin to a debugger.

    Great demo of the new debugger called pry and also the available approaches when one needs to debug their Ruby code.

    Consider using RubyMine as a GUI or your favorite editor should have decent support (I am a vim tragic).

## Code First, Ask Questions Later by Tim Clem

    Code means, "building stuff" from hardware to design or software.

    Most of Tim's talk was about "the github way", and I learnt a fair bit about how they run their company - taking away a few ideas for my own company! Let's be clear though, that "the github way" is not the only way...the talk felt like it dived too far into a sales pitch on github culture/approach.  But I think the motivation is good, take from the talk what you will.

    Biggest things that stick in my mind
    * asynchronous communication is essential because it's great to have a
      distributed team
    * we need a trineobot that does stuff like robot.pour_me_a_beer
    * timing, and allowing people to work when they are productive and focused is better than enforcing a rigid timeframe to be at work
    * if you can build a "ship it" culture, some of the freedoms around timing can be accomodated - instead of working for x hours a day, just get on with it and ship it

    I learnt a lot during this talk...thanks Tim!

## Cognitive Psychology and the Zen of Code by Jay Zeschin

    Jay begins with a stellar quote from SICP, Abelson and Sussman.

    An interesting discourse on the human state in terms of
    * memory state
    * short term vs long term memory
    * cognition
    * attention span

    He went through a few methods to improve how you can focus on the task at hand, with more than the usual tips and tricks, for example, it is harder for us to remember and repeat names that have multipe syllables.  So use shorter variable names.

## Using Your Intuition for Innovation and Decision Making by Suzan Bond

    Information you have access to without a rational thinking process - intuition.

    A discussion that allowed us to appreciate the presence, recognition and use of intuition/gut feeling as a software developer.

    Another soft skills talk that showed me aspects of being a holistic and engaged professional.
