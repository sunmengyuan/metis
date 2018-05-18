module.exports = {
    random: function (min, max) {
        var min = (typeof(min) == "number") ? min : 1;
        var max = (typeof(max) == "number") ? max : (min + 10);
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        return Math.ceil(Math.random() * (max - min + 1)) + min - 1;
    },
    faultTolerant: function (obj) {
        if (obj instanceof Function) {
            return obj() || {};
        } else {
            return (obj !== undefined) ? obj : {};
        }
    }
}