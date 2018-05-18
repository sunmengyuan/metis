function Listener () {
    this.callbacks = []
    this.events = {}
}
Listener.prototype.on = function (event, callback) {
    var eventPos = this.events[event]
    if (eventPos !== undefined) {
        this.callbacks[eventPos] = callback
    } else {
        this.events[event] = this.callbacks.length
        this.callbacks.push(callback)
    }
}
Listener.prototype.emit = function (event) {
    var eventPos = this.events[event]
    if (eventPos !== undefined) {
        if (this.callbacks[eventPos] instanceof Function) this.callbacks[eventPos]()
    } else {
        console.error('不存在该 event')
    }
}
var listener = new Listener()

listener.on('event1', function () {
    console.log('event1')
})
listener.on('event2', function () {
    console.log('event2')
})
listener.emit('event1')
listener.emit('event2')
