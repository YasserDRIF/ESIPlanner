"use strict";

(function ($, window) {
    if (!window.KosmoCharts) {
        window.KosmoCharts = {};
    }

    window.KosmoCharts.InlineBar = function(selector, options) {
        $(selector).addClass('ks-inline-bar-chart');

        var self = this;

        self.options = {
            data: [],
            height: null
        };
        self.settings = {};

        self.load = function(options) {
            self.options = $.extend(self.options, options);
        };

        self.render = function() {
            var max = d3.max(self.options.data);

            console.log(max);

            var x = d3.scale.linear()
                .domain([0, max])
                .range([0, max])
            ;

            var bar = d3.select(selector)
                .selectAll('div')
                .data(self.options.data)
                .enter()
                .append('div')
                .style('height', options.height + 'px')
            ;

            bar.append('div')
                .style('height', function (d) {
                    var percent = (d / max) * 100;

                    return percent + '%';
                })
            ;
        };

        self.load(options);

        return this;
    };
}(jQuery, window));