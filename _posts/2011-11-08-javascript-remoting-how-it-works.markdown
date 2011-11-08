---
layout: post
title: "Javascript Remoting: How It Works"
date: 2011-11-08 13:20
comments: false
categories: 
- blog
- news
---

Author [Luke McFarlane](http://trineo.co.nz/crew.html#lm)

In my [previous blog post](/2011/08/javascript-remoting/) I briefly explained how Javascript remoting can be used in Force.com to provide fast, asynchronous communication between client & server. This time I would like to explain how it works at more of a technical level.

First, we create a remote method within our Apex controller. The method must be global, static, and use the @RemoteAction annotation:

	@RemoteAction
	global static String getHelloWorld() {
		return "Hello world";
	}

Great! Now we can make an asynchronous call to this remote method via Javascript in our Visualforce page:

	<script type="text/javascript">
		var message = '';
		
		function getHelloWorld() {
			HelloWorldController.getHelloWorld(handleGetHelloWorldResult);
		}
		
		function handleGetHelloWorldResult(result, event) {
			if(event.success) {
				alert(result);
			} else {
				alert('Oh dear, the remote call failed: ' + event.message);
			}
		}
	</script>
	
When we call the Javascript function 'getHelloWorld' the remote method is called by passing a callback function. When it completes the callback function 'handleGetHelloWorldResult' is called which will either handle an error (e.g. if the Apex within the remote method throws an exception), or else display the result 'Hello World' via an alert.

This is Javascript remoting in its most simplest form. Of course there are many ways in which we can extend this functionality. If we wanted it to return 'Hello ' and then the user's name, for instance, we can just give the remote method a name parameter:
 		
	global static String getHelloWorld(String name) 
We would then pass this in when we call the method in Javascript:

	HelloWorldController.getHelloWorld('Bob', handleGetHelloWorldResult)

Javascript remote methods can also return Objects & Lists/Arrays, and these are all accessible via the result in the callback function.. Nice! Unfortunately, this doesn't work in the other direction. It is not possible to pass non-primitives from the page back to the remote method.. Not so nice! I normally get use delimited strings to get around this shortfall.

We can easily provide feedback that something is happening in the background by showing a spinner on the page. In this case we would add a line to the 'getHelloWorld' function to show the spinner, and then hide it again at the end of the callback function.

Javascript remoting.. where have you been my whole life?!
	