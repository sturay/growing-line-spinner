(function (angular) {
    
    "use strict";

    angular.module('svgLoader', [])
    .directive('glSpinner', function () {
        var animationIndex = 0;

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                var requestAnimationFrame = window.requestAnimationFrame
                  || window.webkitRequestAnimationFrame
                  || window.mozRequestAnimationFrame
                  || window.msRequestAnimationFrame
                  || function (callback) { return setTimeout(callback, 1000 / 60); };

                var shape = attrs.glId;
                var type = attrs.glType;
                var width = attrs.glStrokeWidth || 6;
                var diameter = attrs.glDiameter || 24;
                var stroke = attrs.glStroke;
                var opacity = attrs.glOpacity || 1 / 5;
                var elemWidth = element[0].clientWidth;
                var elemHeight = element[0].parentElement.clientHeight;
                var originOffset = (diameter === false) ? 32 : diameter / 2;
                var originOffsetW = elemWidth / 2;
                var originOffsetH = (elemHeight / 2) - (originOffset / 2);
                var radius = originOffset - ((width / 2) + 2);
                var reset;
                var thetaDelta = parseFloat(attrs.glSpeed) || 2;

                switch (type) {
                    case 'line':
                        reset = elemWidth;
                        break;
                    case 'square':
                        reset = diameter * 4;
                        break;
                    case 'circle':
                        reset = diameter * Math.PI;
                        break;
                    case 'surround':
                        reset = (elemWidth * 2) + (elemHeight * 2);
                        break;
                }

                var animationTarget;

                function doAnim() {
                    if (type === 'circle') {
                        animationTarget.setAttribute("transform", "rotate(" + animationTarget.currentTheta + ")");
                    }
                    animationTarget.setAttribute("stroke-dasharray", animationTarget.currentTheta);
                    animationTarget.currentTheta += thetaDelta
                    if (animationTarget.currentTheta >= reset) animationTarget.currentTheta = 0;
                    requestAnimationFrame(doAnim);
                }

                // <cc-loader cc-id="myId" cc-type="[circle,line,square,surround]" cc-opacity="[default = .2]" cc-speed="1" cc-diameter="[int - circle type only]" cc-stroke="[# colour value]" cc-stroke-width="[default = 5]"></cc-loader>

                if (type == 'line') {

                    element.html('<svg class="fadeOut"' +
                      ' width="' + elemWidth + '" height="' + width + '" viewBox="0 0 ' + elemWidth + ' ' + width + '">' +
                        '<g transform="translate(' + -width * 2 + ', ' + width / 2 + ')">' +
                        '<line' +
                          ' id="' + shape + animationIndex + '"' +
                          ' fill="none"' +
                          ' stroke="' + stroke + '"' +
                          ' opacity="' + opacity + '"' +
                          ' stroke-width="' + width + '"' +
                          ' stroke-linecap="round"' +
                          ' stroke-miterlimit="10"' +
                          ' x1="' + width + '"' +
                          ' y1="0"' +
                          ' x2="' + elemWidth + '"' +
                          ' y2="0"' +
                          '>' +
                        '</line>' +
                        '</g>' +
                      '</svg>');

                    animationTarget = document.getElementById(shape + animationIndex);
                    animationTarget.currentTheta = 0;
                    doAnim();
                    animationIndex++;

                }

                else if (type == 'circle') {

                    element.html('<svg class="fadeOut"' +
                      ' width="' + elemWidth + '" height="' + elemHeight + '" viewBox="0 0 ' + elemWidth + ' ' + elemHeight + '">' +
                        '<g transform="translate(' + originOffsetW + ', ' + originOffsetH + ')">' +
                          ' <circle' +
                          ' id="' + shape + animationIndex + '"' +
                          ' fill="none"' +
                          ' stroke="' + stroke + '"' +
                          ' opacity="' + opacity + '"' +
                          ' stroke-width="' + width + '"' +
                          ' stroke-linecap="round"' +
                          ' stroke-miterlimit="10"' +
                          ' cx="0"' +
                          ' cy="0"' +
                          ' r="' + radius + '">' +
                        '</circle>' +
                      '</g>' +
                    '</svg>');

                    animationTarget = document.getElementById(shape + animationIndex);
                    animationTarget.currentTheta = 0;
                    doAnim();
                    animationIndex++;
                }

                else if (type == 'square') {

                    var dims = diameter - width

                    element.html('<svg' +
                      ' width="' + diameter + '" height="' + diameter + '" viewBox="0 0 ' + diameter + ' ' + diameter + '">' +
                        '<g transform="translate(' + width / 2 + ', ' + width / 2 + ')">' +
                          ' <rect' +
                          ' id="' + shape + animationIndex + '"' +
                          ' fill="none"' +
                          ' stroke="' + stroke + '"' +
                          ' opacity="' + opacity + '"' +
                          ' stroke-width="' + width + '"' +
                          ' stroke-linecap="round"' +
                          ' stroke-miterlimit="10"' +
                          ' x="0"' +
                          ' y="0"' +
                          ' rx="' + width + '"' +
                          ' ry="' + width + '"' +
                          ' height="' + dims + '"' +
                          ' width="' + dims + '">' +
                        '</rect>' +
                      '</g>' +
                    '</svg>');

                    animationTarget = document.getElementById(shape + animationIndex);
                    animationTarget.currentTheta = 0;
                    doAnim();
                    animationIndex++;
                }
                else if (type == 'surround') {

                    var dims = diameter - width

                    element.html('<svg' +
                      ' width="' + elemWidth + '" height="' + elemHeight + '" viewBox="0 0 ' + elemWidth + ' ' + elemHeight + '" style="position:absolute;">' +
                        '<g transform="translate(' + width / 2 + ', ' + width / 2 + ')">' +
                          ' <rect' +
                          ' id="' + shape + animationIndex + '"' +
                          ' fill="none"' +
                          ' stroke="' + stroke + '"' +
                          ' opacity="' + opacity + '"' +
                          ' stroke-width="' + width + '"' +
                          ' stroke-linecap="round"' +
                          ' stroke-miterlimit="10"' +
                          ' x="0"' +
                          ' y="0"' +
                          ' rx="' + width + '"' +
                          ' ry="' + width + '"' +
                          ' height="' + parseInt(elemHeight - width) + '"' +
                          ' width="' + elemWidth + '">' +
                        '</rect>' +
                      '</g>' +
                    '</svg>');

                    animationTarget = document.getElementById(shape + animationIndex);
                    animationTarget.currentTheta = 0;
                    doAnim();
                    animationIndex++;
                }

                else {
                    element.html('Types allowed for this element are \'line\', \'square\', \'circle\' and \'surround\'');
                }
            }
        };
    });
})(angular);
