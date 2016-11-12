const EventEmitter = require('events');

class ScrollEmitter extends EventEmitter {
    constructor() {
        super();
        this.ticking = false;
        this.position = 0;
        this.direction = '';

        var updateScrollPosition = () => {
            if (this.position !== window.scrollY) {
                const direction = this.position < window.scrollY ? 'down' : 'up';
                this.prevDirection = this.direction;
                this.direction = direction;

                this.position = window.scrollY;
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        this.ticking = false;
                        scrollEmitter.emit('change', this.position, this.direction, this.prevDirection);
                    });
                }
                this.ticking = true;
            }
        };
        window.addEventListener('scroll', updateScrollPosition);
        setInterval(updateScrollPosition, 500);
    }
}

const scrollEmitter = new ScrollEmitter();
module.exports = scrollEmitter;