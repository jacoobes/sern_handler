const {
    getMentions
} = require('./utils')

class Argument {


    constructor(argument, array, argType, validate) {

        this.argument = argument
        this.array = array
        this.argType = argType
        this.validate = validate
        this.utils = {
            getMentions: getMentions
        }


    }

    setArray() {


        if (this.array) {
            return this.argument = Array.prototype.slice.call(this.argument, 2)
        } else {

            return this.argument = Array.prototype.slice.call(this.argument, 2).join(' ')
        }


    }

    setType() {

        let desiredType = this.argType
        /**
         * All type coercion: 
         * String, Boolean, Number, Map, Set, flex 
         * 
         * 
         */

        if (this.argType === 'flex') return this.argument

        if (Array.isArray(this.argument)) {

            return this.argument = this.argument.map(
                el => desiredType(el))

        } else {

            return this.argument = this.argType(this.argument) || new this.argType(this.argument)

        }

    }

    ensureValidationFunction() {
        if (this.validate == null) return;


        let passesTest = this.validate(this.argument)

        return passesTest
    }






}
module.exports.Argument = Argument





/*name: 'profile',
 aliases: ['p'],
    hasArguments: { 
        argType: 'string',
        multiple: false,
    },
 ownerOnly: true 
 hasUserPermissions
 description: "checks your own profile",
 
 
 */