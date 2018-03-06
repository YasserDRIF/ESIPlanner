"use strict";

(function ($, window) {
    if (!window.KosmoCharts) {
        window.KosmoCharts = {};
    }

    window.KosmoCharts.Area = function(element, options) {
        var $element = $(element);
        var self = this;

        self.options = {
            theme: 'default',
            data: [],
            width: null,
            height: null
        };

        self.load = function(options) {
            try {
                self.options = $.extend(self.options, options);
                self.validateOptions();

                return true;
            } catch (e) {
                console.log(e.message);

                return false;
            }
        };

        self.validateOptions = function() {

        };

        self.render = function() {
            var isValid = self.load(options);

            if (!isValid) {
                return;
            }

            var svg = d3.select($element[0])
                .append("svg")
                .attr('class', 'ks-area-chart ks-theme-' + self.options.theme)
                .attr({
                    width: self.options.width,
                    height: self.options.height
                })
            ;

            var max = d3.max(self.options.data);
            var paddingTop = Math.ceil((max / 100) * 50);

            console.log(self.options.width);

            var x = d3.scale.linear()
                .domain([0, self.options.data.length])
                .range([0, self.options.width]);

            var y = d3.scale.linear()
                .domain([0, max + paddingTop])
                .range([self.options.height, 0])
            ;

            var area = d3.svg.area()
                .x(function(d, i) {
                    return x(i);
                })
                .y0(self.options.height)
                .y1(function(d) {
                    return y(d);
                })
            ;

            var line = d3.svg.line()
                .x(function(d, i) {
                    return x(i);
                })
                .y(function(d) {
                    return y(d);
                })
            ;

            // area
            svg.append("path")
                .datum(self.options.data)
                .attr("class", "ks-area")
                .attr("d", area)
            ;

            // top line
            svg.append("path")
                .datum(self.options.data)
                .attr("class", "ks-line")
                .attr("d", line)
            ;
        };

        self.render();

        return this;
    };
}(jQuery, window));