# growing-line-spinner
A simple svg spinner directive for angular 1.x with circular and linear versions and lots of options.
___

## options
 For the circular option, there is the choice of diameter, stroke thickness, stroke colour and opacity.
 The speed is another matter and that is on my list of things to do.
 - gl-id - *Must be set
 - gl-type - *Must be set to either 'circle', 'square' or 'line' and cannot be missing
 - gl-strokeWidth - The stroke width of the spinner. Defaults to 6
 - gl-diameter - The diameter of the spinner which if omitted defaults to 24
 - gl-stroke - this is the colour of the spinner. Stroke is used as it is an svg element. Default is rgb(0,0,0)
 - gl-opacity - How transparent do you want it? Default is .2 and is based on the css values of 0 to 1
 The linear options are identical except there is no need for the diameter option.
___

## installation
 As with simple directives, simply include it in your root and point your scripts towards it calling the directive 'glspinner'.

> var app = angular.module('myApp', ['glspinner']);

Add the next line to your stylesheet
> glspinner[cc-type='line'] {width:100%;display:block;}

You can see the thing working in this plunk: https://plnkr.co/edit/jnSbb1
