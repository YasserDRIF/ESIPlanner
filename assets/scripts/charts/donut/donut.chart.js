(function ($, window) {
    window.Charts = {};
    window.Charts.Donut = function(element, options) {
        var $element = $(element);
        var self = this;

        self.options = {
            width: null,
            height: null,
            thickness: '20%',
            centered: true
        };
        self.settings = {};

        self.load = function(options) {
            self.options = $.extend(self.options, options);
            self.settings.width = self.options.width || $element.width();
            self.settings.height = self.options.height || $element.height();
            self.settings.radius = Math.min(self.options.width, self.options.height) / 2;
            self.settings.centered = self.options.centered;

            if ($.type(self.options.thickness) === "string" && self.options.thickness.search(/%/g)) {
                var thickness = (100 - parseInt(self.options.thickness, 10)) / 100;
                self.settings.innerRadius = self.settings.radius * thickness;
            } else if ($.type(self.options.thickness) === "number" || $.type(self.options.thickness) === "string") {
                self.settings.innerRadius = self.settings.radius - parseInt(self.options.thickness, 10);
            }
        };

        this.load(options);

        var data = d3.range(10).map(Math.random).sort(d3.descending);
        var color = d3.scale.category20();
        var arc = d3.svg.arc().outerRadius(this.settings.radius);
        var pie = d3.layout.pie();
        var container = d3.select(element).append("svg")
            .datum(data)
            .attr("width", self.settings.width)
            .attr("height", self.settings.height)
        ;

        if (self.settings.centered) {
            container
                .style('display', 'block')
                .style('margin', '0 auto')
            ;
        }

        var svg = container
            .append("g")
            .attr("transform", "translate(" + self.settings.width / 2 + "," + self.settings.height / 2 + ")")
        ;
        var arcs = svg.selectAll("g.arc")
            .data(pie)
            .enter().append("g")
            .attr("class", "arc")
        ;

        arcs.append("path")
            .attr("fill", function(d, i) { return color(i); })
            .transition()
            .ease("bounce")
            .duration(2000)
            .attrTween("d", tweenPie)
            .transition()
            .ease("elastic")
            .delay(function(d, i) { return 2000 + i * 50; })
            .duration(750)
            .attrTween("d", tweenDonut);

        function tweenPie(b) {
            b.innerRadius = 0;
            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function(t) { return arc(i(t)); };
        }

        function tweenDonut(b) {
            b.innerRadius = self.settings.innerRadius;
            var i = d3.interpolate({innerRadius: 0}, b);
            return function(t) { return arc(i(t)); };
        }

        this.render = function() {

        };

        this.render();

        return this;
    };
}(jQuery, window));