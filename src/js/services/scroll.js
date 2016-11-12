const EventEmitter = require('events');

const DIRECTION_BIAS = 80;
const scrollableElement = document.getElementById('root');
const getPosition = () => {
    return scrollableElement.scrollTop;
};

class ScrollEmitter extends EventEmitter {
    constructor() {
        super();
        this.ticking = false;
        this.position = 0;
        this.directionChangedAt = null;
        this.direction = '';

        var updateScrollPosition = () => {
            const position = getPosition();
            if (this.position !== position) {
                const direction = this.position < position ? 'down' : 'up';
                if (direction !== this.direction) {
                    if (this.directionChangedAt === null) {
                        this.directionChangedAt = position;
                    }
                    if (Math.abs(this.directionChangedAt - position) > DIRECTION_BIAS) {
                        this.prevDirection = this.direction;
                        this.direction = direction;
                        this.directionChangedAt = null;
                    }
                } else {
                    this.directionChangedAt = null;
                }

                this.position = position;
                if (!this.ticking) {
                    window.requestAnimationFrame(() => {
                        this.ticking = false;
                        scrollEmitter.emit('change', this.position, this.direction, this.prevDirection);
                    });
                }
                this.ticking = true;
            }
        };
        scrollableElement.addEventListener('scroll', updateScrollPosition);
        setInterval(updateScrollPosition, 500);
    }
}

const scrollEmitter = new ScrollEmitter();
module.exports = scrollEmitter;