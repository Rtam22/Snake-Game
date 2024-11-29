
class Player {
    constructor(length, direction, location) {
        this.length = 1
        this.direction = 'right'
        this.location;
    }

    setDirection (direction) {
        this.direction = direction 
        console.log('Snake direction = ' + this.direction)
    }

}

export default Player