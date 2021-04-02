const {
    getMentions
} = require('./mentions')
const randomInt = require('./randomInt').getRandomInt
const {paginate} = require('./paginatorCheems')
class Argument {


    constructor(argument, array, argType = undefined, validate = null) {

        this.argument = argument
        this.array = array
        this.argType = argType
        this.validate = validate
        this.utils = {
            check: require('./valid/validate').validate,
        }
    }

    setArray() {

        if (this.array) return this.argument = Array.prototype.slice.call(this.argument, 1)

        else return this.argument = Array.prototype.slice.call(this.argument, 1).join(' ')

    }
    /**
     * All type checks: 
     * string, integer, number, character, flex, integer, decimal
     * 
     * 
     */

    get type() {

        if (this.argType === undefined) return
        let desiredType = this.array ? this.argType.split(" ") : [this.argType]

        let argLine = "";
        
        let index = 0;
        for (let header of desiredType) {
            let argument;
            
        
            if (Array.isArray(this.argument)) {

                argument = +this.argument[index] || this.argument[index]

            } else {

                argument = +this.argument || this.argument
            }
            
            if (header === 'flex') {

                argLine += 'flex '

            } else if (typeof argument === 'string') {

                argLine += argument.length === 1 ? 'character ' : 'string ';

            } else if (typeof argument === 'number') {

                if (header === 'number') {

                    argLine += 'number '

                } else {

                    argLine += argument % 1 === 0 ? 'integer ' : 'decimal ';

                }

                
            }
            index++;
            


        }
        return argLine.trim();
    }

    ensureValidationFunction() {
        if (this.validate == null) return true;

        let passesTest = this.validate(this.argument)

        return passesTest
    }

    static randomInt(min, max) {

        return randomInt(min, max)


    }

    static getMentions(argument, message) {

        return getMentions(argument, message)

    }

    static paginate (message, embed, options) {

        return paginate(message, embed, options)
    }



}




module.exports = Argument