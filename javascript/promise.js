function Promise (fn) {
    var callbacks = []
    this.then = function (callback) {
        callbacks.push(callback)
        return this
    }
    function resolves () {
        var t = setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback()
            })
        }, 0)
    }
    fn(resolves)
}

var timeout = function (time) {
    var promise = new Promise(function (resolve, reject) {
        console.log('执行 1')
        var t = setTimeout(function () {
            resolve()
        }, time)
    })
    return promise
}
timeout(1000).then(function () {
    console.log('执行 2')
}).then(function () {
    console.log('执行 3')
})
