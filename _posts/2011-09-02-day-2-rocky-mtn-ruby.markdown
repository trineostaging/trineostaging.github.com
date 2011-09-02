---
layout: post
title: "Day 2 Rocky Mountain Ruby 2011"
date: 2011-09-02 09:05
categories: 
- blog
---

## A quick writeup on the talks given at RockyMtnRuby

    Not exhaustive, not complete, but just a few notes about what stuck in my mind as people gave excellent talks...

## Real Time Rack by Konstantin Haase

    This was bad timing for this topic.  0900 after all of us had a big night out ... 

    Rack is "Ruby to HTTP to Ruby bridge"

    Middleware API for all web frameworks around in Ruby.

    Server Sent Events is a new HTML5 standard, which is a one way websocket to send data from the server to the client.

    I really needed to have had more coffee this morning!

## Implementing Rails 3.1, Backbone.js, CoffeeScript, jQuery, Sass, and CouchDB on EC2 by Rod Cope

    Talked through a set of technologies used to deliver his company's new product for the cloud - OpenLogic Open PaaS.

    Discussed the approach to deal with a 2 month timeline needed to go from zero to production.

    Quite a good and succinct walk through the various components in the web app stack they used.  General vibe was that most things have pros and cons, except Sass which everyone in their team loved.

    Sounds like the team really flexed and pushed their product dev through the above, and prepared themselves for high volume delivery.

## There are no tests by Jeff Casimir

    Projects go wrong but that doesn't mean that they can't be turned around.

    Software projects don't go wrong for technical reasons, usually because of people reasons.

    Rescue projects are the most noble and difficult projects.

    To do this well you need
    * expertise - not the place for a novice
    * passion
    * determination - be ready to engage in a relentless pursuit

    Rare that a project has both good coverage, and real testing.

    Velocity - be aware that things will move slowly initially, but your velo estimates should see parity with actuals.

    Suggests reading, "Clean Coder".

    This talk resonated with me heavily, 

    Communicate more with your rescue project clients, and so communicate with them.  Make movies/screencasts for them.

    Trust comes from expertise consistently applied.

    Process and tooling
    * git
    * github
    * rspec
    * Deploy in one command!  Make this deployment approach your priority if it doesn't exist.
    * Monitor your trends. Runtime, value, coverage and complexity.

    Write tests.  You may develop slowly because of the fact that you write tests, you will however do maintenance a lot faster.  The long term gain will be concrete.

    Test
    * relationships
    * validations
    * calculations
    * helpers

    Find an area of complexity, test it on the browser, extract a small logical piece within the area (eg an if-else statement), and validate it by writing a test for it.

    Comment driven development.  Still follow your TDD process.

    Write tests for the happy path, and then make sure you write a lot of pending tests that you need to tackle (helpful for future debugging).

    Bug reports.  Teach your client to log a bug report appropriately.

## Ruby Messaging Patterns by Gerred Dillon

    Focus of this talk is the use of messaging patterns to remove bottlenecks and deal with application behaviour.

    Speaks about the use of RabbitMQ for connecting to a downstream system, which means that your ruby app can do its job, and enqueue tasks to connect to this downstream system (eg a public API) without needing block and wait for a response (if appropriate).

    Between an application and a database, you can use a queue like resque to handle all persist actions in an asynchronous manner.

    Trade offs of data availability with speed.

    Must check out 'queue\_classic' gem.

    To set up a development environment or replicate complex envs using all of these components consider using the 'soloist' gem.

## Cloning Twitter: Rails + Cassandra = Scalable Sharing by Charles Max Wood

    Cassandra - tries to deliver Availability and Partitioning.

    Why?
    * write optimized
    * works well for geographic distribution - clustering and replication offsite

    Cassandra schema is essentially a Keyspace, which has Column Families, and these have columns - which are ultimately key value pairs.

    Don't use it if you just a single Cassandra server - the idea is to gain benefit from partitioning your data.

    Since Cassandra wont strive to reach complete consistency for every transaction on the spot, you can query using a consistency factor that says, "I want 3 of my servers to concur on the response".

    He has worked on the 'sandra' gem to be able to deliver a ORM style Cassandra interface for Rails.  Simple API and syntax.

## Lightning Talks
### Growing Programmers
    Help grow some programmers - tech them the way, then allow them to teach others.
### Deprecate Me
    Gem used to mark and deprecate code in your API.
### Unless
    Defence of the unless conditional statement.
### Do your commit messages suck?
    Strong, well written commit messages convey a great deal without needing to dive into the deal.
    Verb - Fragment - Some Details.
### Testing JS with Rails 3.1
    Check out the 'test_track' gem.
### SM Framework
    Servers should be submissive.  System, stack, scripting Management Framework.

## Start using Jasmine. Write better JavaScript. Profit by Justin Searls and Cory Flanigan

    Went out for a coffee at The Cup Espresso - best coffee I've had in the US so far.

    Missed the talk.  Sorry...

## Surviving Growing from Zero to 15,000 Selenium Tests by Jim Holmes

    Jim talks about testing in this volume, and the long run time of these tests.

    First proposal is to distribute the workload of functional testing.  Use VMs to host the testing frameworks, and run this using selenium-grid.

    Deal with the performance aspect of testing early, so you can easily keep testing, and not get jaded over time as things slow down.

    Ensure you DRY, refactor tests, and build a backing API.

    Show the value in what you do, to build culture around what you're doing.

    Long running tests are tough and you have to look at how you can divide and conquer, scale up, only test specific valuable code/function, and automate.

## Testing Panel with Jeff Casimir, Justin Searls, Cory Flanigan, Jim Holmes

    A nice relaxed flowing panel discussion about how to test, and when and how to learn about testing.

    Touched all areas at a high level of
    * types of testing
    * how/where to learn more
    * when interviewing people the panel ask about testing
    * continuous integration and really seeking better understanding from failure
      (check out travis-ci)
    * mock or not and when

## A Documentation Talk by Zach Holman

    Lots of pragmatic info about documentation, using github as the example.

