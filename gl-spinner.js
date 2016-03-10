(function(){
  'use strict';
  angular.module('glspinner', [])

  .directive('glspinner', ['$window', function($window){

    var animationIndex = 0;

  return {
    restrict: 'E',
    link: function (scope, element, attrs){
      
      var shape = attrs.glId;
      var type = attrs.glType;
      var width = attrs.glStrokeWidth || 6;
      var diameter = attrs.glDiameter || 24;
      var stroke = attrs.glStroke || 5;
      var opacity = attrs.glOpacity || 1/5;
      var elemWidth = element[0].clientWidth;
      var originOffset = (diameter === false)? 32 : diameter / 2;
      var radius = originOffset - ((width / 2) + 2);
      var reset = (type === 'line')? elemWidth : diameter * Math.PI;
      var animationTarget;
      var thetaDelta = parseFloat(glSpeed) || 1;
      
      function doAnim() {
        if(type === 'circle') {
          animationTarget.setAttribute("transform", "rotate(" + animationTarget.currentTheta + ")");
          animationTarget.currentTheta += .1
        }
        else {animationTarget.currentTheta += .6}
        animationTarget.setAttribute("stroke-dasharray", animationTarget.currentTheta);
        animationTarget.currentTheta += thetaDelta
        if(animationTarget.currentTheta > reset){ animationTarget.currentTheta = 0}
        requestAnimationFrame(doAnim);
      }
      
      // <cc-loader cc-id="myId" cc-type="[circle,line]" cc-opacity="[default = .2]" cc-diameter="[int - circle type only]" cc-stroke="[# colour value]" cc-stroke-width="[default = 5]"></cc-loader>

      if (type == 'line') {

        element.html('<svg' +
          ' width="'+elemWidth+'" height="'+width+'" viewBox="0 0 '+elemWidth+' '+width+'">' +
            '<g transform="translate('+ -width * 2+', '+width / 2+')">' +
            '<line' +
              ' id="'+shape + animationIndex +'"' +
              ' fill="none"' + 
              ' stroke="'+stroke+'"' + 
              ' opacity="'+opacity+'"' +
              ' stroke-width="'+width+'"' + 
              ' stroke-linecap="round"' + 
              ' stroke-miterlimit="10"' + 
              ' x1="'+width+'"' + 
              ' y1="0"' + 
              ' x2="'+elemWidth+'"' + 
              ' y2="0"' +
              '>' +
            '</line>' +
            '</g>' +
          '</svg>');
          
        animationTarget = document.getElementById(shape+animationIndex);
        animationTarget.currentTheta = 0;
        doAnim();
        animationIndex++;
          
      }
      
      else if (type == 'circle') {

        element.html('<svg' +
          ' width="'+diameter+'" height="'+diameter+'" viewBox="0 0 '+diameter+' '+diameter+'">' +
            '<g transform="translate('+originOffset+', '+originOffset+')">' +
              ' <circle' +
              ' id="'+shape + animationIndex +'"' +
              ' fill="none"' +
              ' stroke="'+stroke+'"' +
              ' opacity="'+opacity+'"' +
              ' stroke-width="'+width+'"' +
              ' stroke-linecap="round"' +
              ' stroke-miterlimit="10"' +
              ' cx="0"' +
              ' cy="0"' +
              ' r="'+radius+'">' +
            '</circle>' +
          '</g>' +
        '</svg>');
        
        animationTarget = document.getElementById(shape+animationIndex);
        animationTarget.currentTheta = 0;
        doAnim();
        animationIndex++;
      }
      
      else {
        element.html('Types allowed for this element are \'line\' and \'circle\'');
      }
    },
  };
}]);
  
})();
