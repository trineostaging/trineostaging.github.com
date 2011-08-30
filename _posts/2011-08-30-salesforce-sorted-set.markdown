---
layout: post
title: "Value Sorted Sets in Salesforce"
date: 2011-08-28 10:25
categories: 
- blog
---

Author [Jack Galilee](/crew.html#jg)

So I've spent ages today looking at how to do achieve a sorted map in salesforce, where we want to sort by the value. This is for you if there if there is no natural order to your keys but there is for your values, and there is a unique property for your keys but no unique property your values. It isn't easy, so I thought I'd write a blog post both for your benefit and so that I completely understand it my self.

Lets start with an example situation

I have a bunch of gymnastic cats. These cats are competing in a range of different gymnastic events. I want to score each of these cats against each event and order the cats by their scores from highest to lowest but cats can still have the same score for an event. Example data ...

Event : Scratching
*   Fluffy ~ 99%
*   Mitten ~ 99%
*   Bobo ~ 87%
*   Coco 2%

Event : Purring
*   Bobo ~ 100%
*   Fluffy ~ 100%
*   Mitten ~ 100%
*   Coco ~ 0%

Coco isn't doing well.

I need some method ScoreCat(Event, Cat) which returns the cats score for the given event.

I need another method for scoring all the cats against all the events. We assume that all the cats are good sports, and like to try new things, so every cat competes in every event ... except maybe Coco. We can do this with `ScoreCats(List<Event> events, List<Cat> cats)`, this method will loop over each event and score each cat against the event, moving onto the next event and scoring each cat, etc.

How does this work?

	/**
	 *
	 * Given a list of events and a list of cats. Score each cat against each event.
	 * Map that scores that are recorded and the list of cats that achieved the scores.
	 *
	 * Note: Every cat that is listed will compete in every event.
	 *
	 * @param events List of all the events the cats will compete in.
	 * @param cats List of all the cats that are competing in the events.
	 * @param Map of the event to a map of each score to a list of achiving cats.
	 */
	public Map<Event, Map<Decimal, List<Cat>>> ScoreCats(List<Event> events, List<Cat> cats) {
	    
	    // Prepare our outrageously complex collection map.
	    Map<Event, Map<Decimal, List<Cat>>> scoredEvents = new Map<Event, Map<Decimal, List<Cat>>>();

	    // Lets start judging the cats for each of the events.
	    for( Event event : events ) {
		
		// Prepare the tally board for scoring these gymnastic cats!
		Map<Decimal, List<Cat>> scoredCats = new Map<Decimal, List<Cat>>();

		// Gymnastic cats are GO!
		for( Cat cat : cats ) {

		    // Judge that cat, what did they score!
		    Decimal score = scoreCat(event, cat);
		    
		    // Have any cats scored this?
		    if(scoredCats.keySet().contains(score)) {
			
			// If they have, record the current cat as also having this score.
			scoredCats.get(score).add(cat);
		    
		    // Have no cats scored this?
		    } else {
			
			// Make a new list for cats with this score, add the scoring cat.
			List<Cat> newCats = new List<Cat>();
			newCats.add(cat);

			// Record the new list of cats against the score.
			scoredCats.put(score, newCats);
		    }
		    
		}

		// Record the scores and the achieving cats against the event they were in.
		scoredEvents.put(event, scoredCats);

	    }

	}


So thats all well and good you say.... but how to I get the order?

Like so!

	// Get the score for the cats and their events.
	Map<Event, Map<Decimal, List<Cat>>> scoredCat = ScoreCats(events, cats);

	// Pick some event we want to list the scores for.
	Event someEvent = ...

	// Need to turn the keyset into a list because it has .sort()
	List<Decimal> scores = new List<Decimal>();
	scores.addAll(scoredCats.get(someEvent).keySet());

	// Loop over each score in ascending order.
	for(Decimal score : scores.sort()) {

	    // Get all the cats that had that score! this is the top score.
	    List<Cat> cats = scoredCat.get(someEvent).get(score);

	    // If we just had cats as names we could also sort them.
	    // ## Since they're not, we can't. If they were strings we could!
	    for(Cat cat : cats) {
		System.debug(Cat.name + ', scored: ' + score);
	    }

	}

And thats that! we now have achieved a value sorted map!
