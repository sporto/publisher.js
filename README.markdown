Publisher.JS
----------------

A tiny JS library for adding publish / subscribe functionallity to objects (also known as observers or event listeners).
Tested using Jasmine.js


How to use
============

Include publisher.js in your page

Add publishing/subscribe functionallity to any JS object:
	Publish.extend(myObject);

To subscribe:
	myObject.subscribe("actionName", observer.callbackFunction );

To unsubscribe:
	myObject.unsubscribe("actionName", observer.callbackFunction );

To broadcast an event:
	myObject.publish("actionName",[param1, param2]);

Note that params must be send in an array.

To do
==========
- Functions for unsubscribe in bulk
