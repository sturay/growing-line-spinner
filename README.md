# Angular JS: growing-line-spinner
A simple svg spinner directive for angular 1.x with circular and linear versions and lots of options.
I was basically flummoxed by the lack of really configurable spinners, or spinners that were based on gif images or css reliant to make icon font elements rotate. So, I created this spinner that uses svg and some vanilla.js wrapped in a tidy angular module. It's small and as long as you get the css behavoirs of the position attribute, you should be good to go.
___

## options
 For the circular option, there is the choice of diameter, stroke thickness, stroke colour and opacity.
 The speed, although behaving exactly as expected, is currently user defined and can appear odd, but that is on my list of things to remedy.
 - gl-id - Sanity item so you know what's what
 - gl-type - *Must be set to either 'circle', 'square' or 'line' and cannot be missing
 - gl-strokeWidth - The stroke width of the spinner. Defaults to 6
 - gl-size - The diameter of the spinner which if omitted defaults to 24
 - gl-stroke - this is the colour of the spinner. Stroke is used as it is an svg element. Default is rgb(0,0,0)
 - gl-opacity - How transparent do you want it? Default is .2 and is based on the css values of 0 to 1
 - gl-speed - This is logarithmic. Below 48px, decimals are best to slow it down. Integers at that size larger than 1 make the speed look kinda silly. However, a radius of 72 and a speed of 2 or 3 could work quite well. It's up to you really.
 - gl-endcap - There are three options: round, square and butt. Square adds padding to the end of the stroke which means that the physical end of the line precedes the mathematical point by half of the stroke width, while 'butt' stops the line at the mathematical point of the line ending. 
 
 The linear options are identical except there is no need for the diameter option.
___

## installation
 As with simple directives, simply include it in your root and point your scripts towards it calling the directive 'glspinner'.

> var app = angular.module('myApp', ['glspinner']);

Add the contents of style.css to your stylesheet

If you are using a task runner like Grunt or Gulp, the version for compilers may be the best option. Use the regular version if you are simply including it as an http call.

You can see the thing working in this plunk: https://plnkr.co/edit/jnSbb1

## Todo
- Looking at a surrounding spinner that encapsulates the containing element - started
- As the speed is somewhat hit and miss at the moment, a small method that matches a decent speed with the chosen diameter would be beneficial. However, that would be over-rideable (if that's even a word). (Should be IMHO)
- Currently styling requires that the parent element has a relative position. Needs a way to make that irrelevant
- There's a fair amount of duplication of code, so a refactoring is probably necessary
- Possibly look at an option to have specific heights and widths so that ellipses and oblongs can be created
- Create a stylesheet for Stylus, Less and Sass

## Changes
- I have changed the language from gl-diameter to gl-size as it bares more relevance to shapes that are not circular.