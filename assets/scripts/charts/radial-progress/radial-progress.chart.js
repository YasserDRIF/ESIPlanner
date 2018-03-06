"use strict";

(function ($, window) {
    if (!window.KosmoCharts) {
        window.KosmoCharts = {};
    }

    window.KosmoCharts.RadialProgress = function(element, options) {
        var $element = $(element);
        var self = this;

        self.options = {
            padding: 0,
            amount: 0,
            cornerRadius: 10,
            lineWidth: 10,
            postfix: '',
            description: '',
            size: null,
            showAmount: true
        };

        self.load = function(options) {
            try {
                self.options.width = options.size;
                self.options.height = options.size;
                self.options = $.extend(self.options, options);
                self.validateOptions();

                return true;
            } catch (e) {
                console.log(e.message);

                return false;
            }
        };

        self.validateOptions = function() {
            if (typeof self.options.size === undefined || (self.options.size === null)) {
                throw new Error('Invalid property value for "size"');
            }
        };

        self.render = function() {
            var isValid = self.load(options);

            if (!isValid) {
                return;
            }

            var ratio = self.options.amount / 100;

            var pie = d3.layout.pie()
                .value(function(d) {
                    return d
                })
                .sort(null)
            ;

            var outerRadius = (self.options.width / 2) - self.options.padding;
            var innerRadius = outerRadius - self.options.lineWidth;

            var svg = d3.select($element[0])
                .append("svg")
                .attr({
                    width: self.options.width,
                    height: self.options.height
                }).append('g')
                .attr({
                    transform:'translate(' + self.options.width / 2 + ',' + self.options.height / 2 + ')'
                })
            ;

            var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0)
                .endAngle(2 * Math.PI)
            ;

            var arcLine = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .cornerRadius(self.options.cornerRadius)
                .startAngle(0)
            ;

            var pathBackground = svg.append('path')
                .attr({
                    d: arc,
                    class: 'ks-background'
                })
            ;

            var pathChart = svg.append('path')
                .datum({endAngle:0})
                .attr({
                    d: arcLine,
                    class: 'ks-progress-line'
                })
            ;

            var middleCount = svg.append('text')
                .text(self.options.amount + self.options.postfix)
                .attr({
                    class: 'ks-amount',
                    dy: 5,
                    dx: 0
                })
            ;

            if (!self.options.showAmount) {
                middleCount.classed('ks-invisible', true);
            }
            
            if (self.options.description) {
                var ksDescription = svg.append('text')
                    .text(self.options.description)
                    .attr({
                        class: 'ks-description',
                        dy: 25,
                        dx: 0
                    })
                ;    
            }

            var arcTween = function(transition, newAngle) {
                transition.attrTween("d", function (d) {
                    var interpolate = d3.interpolate(d.endAngle, newAngle);
                    var interpolateCount = d3.interpolate(0, self.options.amount);

                    return function (t) {
                        d.endAngle = interpolate(t);
                        var amount = Math.floor(interpolateCount(t));
                        middleCount.text(amount + self.options.postfix);

                        return arcLine(d);
                    };
                });
            };

            var animate=function(){
                pathChart.transition()
                    .duration(750)
                    .ease('cubic')
                    .call(arcTween,((2*Math.PI))*ratio);
            };

            animate();
        };

        return this;
    };
}(jQuery, window));