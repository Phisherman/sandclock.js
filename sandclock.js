var sandclock;

(function() {

    //code snippet from: http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
    var clone = function(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    var getDefaultOptions = function() {
        var defaultOptions = {
            width: 100,
            height: 240,
            bottleneck: 0.04,
            margins: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            background: "white",
            progress: 0,
            maxTop: 0.5,
            maxBottom: 0.5,
            selector: undefined
        };

        return clone(defaultOptions);
    };

    sandclock = function(selector) {
        if (!(this instanceof sandclock))
            return new sandclock(selector);
        this.options = getDefaultOptions();
        this.options.selector = selector;
    };
    sandclock.prototype.width = function(width) {
        this.options.width = width;
        return this;
    };
    sandclock.prototype.height = function(height) {
        this.options.height = height;
        return this;
    };
    sandclock.prototype.bottleneck = function(bottleneck) {
        this.options.bottleneck = bottleneck;
        return this;
    };
    sandclock.prototype.margins = function(margins) {
        this.options.margins = margins;
        return this;
    };
    sandclock.prototype.progress = function(progress) {
        this.options.progress = progress;
        return this;
    };
    sandclock.prototype.maxTop = function(maxTop) {
        this.options.maxTop = maxTop;
        return this;
    };
    sandclock.prototype.maxBottom = function(maxBottom) {
        this.options.maxBottom = maxBottom;
        return this;
    };
    sandclock.prototype.render = function() {
        var options = this.options;

        options.bottleneckInPx = options.width * options.bottleneck;
        options.maxProgressTop = 0.9;
        options.currentTop = options.progress <= options.maxProgressTop ?
            options.height / 2 * options.maxTop / options.maxProgressTop * (options.maxProgressTop - options.progress) : 0;
        options.currentBottom = options.height / 2 * options.maxBottom * options.progress;

        var canvas = d3.select(options.selector)
            .style("width", options.width)
            .style("height", options.height);

        var sandTop = canvas.append("rect")
            .attr("class", "sand")
            .attr("x", 0)
            .attr("y", options.height / 2 - options.currentTop)
            .attr("width", options.width)
            .attr("height", options.currentTop);

        var sandBottom = canvas.append("path")
            .attr("class", "sand")
            .attr("d", function() {
                var data = [
                    [0, options.height],
                    [options.width, options.height],
                    [options.width / 2, options.progress <= 0.1 ? options.height : options.height - options.currentBottom]
                ];
                var path = "M" + data.join("L") + "Z";
                return path;
            });

        var sandJet = canvas.append("rect")
            .attr("class", "sand")
            .attr("x", (options.width - options.bottleneckInPx) / 2)
            .attr("y", options.progress >= 0.9 ? options.height / 2 + options.height / 2 * (options.progress - 0.9) * 10 : options.height / 2)
            .attr("width", options.bottleneckInPx)
            .attr("height", options.progress <= 0.1 ? options.height / 2 * options.progress * 10 : options.height / 2);

        var left = canvas.append("path")
            .attr("class", "background")
            .attr("d", function() {
                var data = [
                    [0, 0],
                    [0, options.height],
                    [(options.width - options.bottleneckInPx) / 2, options.height / 2]
                ];
                var path = "M" + data.join("L") + "Z";
                return path;
            });

        var right = canvas.append("path")
            .attr("class", "background")
            .attr("d", function() {
                var data = [
                    [options.width, 0],
                    [options.width, options.height],
                    [options.width - (options.width - options.bottleneckInPx) / 2, options.height / 2]
                ];
                var path = "M" + data.join("L") + "Z";
                return path;
            });
    }
}());