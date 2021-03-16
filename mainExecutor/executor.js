class sern_handler {

    constructor(payload) {

        this.payload = payload


        if (payload == null) {
            return console.error('LoremIpsum requires a payload.')
        }

        if (payload.data.events == null) {

            (async function () {

                let {
                    commandCollection,
                    aliasCollection
                } = await payload.setCommands()

                const {
                    Argument
                } = require('../Argument/argumentHandler')

                let {
                    prefix,
                    client
                } = payload.data

                client.on('message', async message => {


                    if (message.author.bot || !message.content.toLowerCase().startsWith(prefix)) return;

                    let messageEmitted = message.content.slice(prefix.length).trim().split(/\s+/g)

                    let command = commandCollection.get(messageEmitted[0]) || aliasCollection.get(messageEmitted[0]) || null

                    if (command == null) return message.reply('Command not found.')



                    let {
                        usesArguments: {
                            argType,
                            array,
                            validate,
                            typeError,
                            validateError = "Arguments did not pass the test",
                            noArgumentsError = 'Please provide arguments',
                            notOwnerError = 'You do not have access to this command.'
                        }
                    } = command

                    let argument = new Argument(messageEmitted, array, argType, validate)
                    argument.setArray()

                    if (command.ownerOnly) {
                        if (!payload.data.owners.includes(message.author.id)) {
                            return message.reply(notOwnerError);
                        }
                    }


                    if (command.usesArguments) {


                        if (!argument.ensureValidationFunction()) {
                            return message.reply(validateError)
                        }
                        if (argument.type() !== argType) {

                            if (argument.argument === '') {
                                return message.reply(noArgumentsError)
                            }
                            typeError = typeError || `Incorrect type. Require(s) \`${argType}\`. Received \`${argument.type()}\``
                            return message.reply(typeError)
                        }


                        return command.callback(payload, message, argument)

                    }

                    return command.callback(payload, message)


                })


            })()

        }
    }


    async displayOptions(wantsLog = {
        consoleCommands: false,
        consoleRAM: false,
        customMessage: false

    }) {

        let {
            commandCollection
        } = await this.payload.setCommands()

        let {
            consoleCommands,
            consoleRAM,
            customMessage
        } = wantsLog

        if (consoleCommands) {
            let commandTable = {}
            for (let [key, value] of commandCollection) {
                value.description == undefined ?
                    (value.description = ``) :
                    (commandTable[key] = value.description)
            }
            console.log('Registering:')
            console.table(commandTable)
        }

        if (consoleRAM) {
            const used = process.memoryUsage()
            let memoryToMegaBytes = []
            let keys = []

            for (let key in used) {
                memoryToMegaBytes.push(Math.round((used[key] / 1024 / 1024) * 100) / 100)
                keys.push(key)
            }

            let tableOfMemory = keys.reduce((accumulator, currentValue, index) => {
                accumulator[currentValue] = memoryToMegaBytes[index] + 'MBs'

                return accumulator
            }, {})

            console.table(tableOfMemory)
        }

        if (customMessage) {
            console.log(wantsLog.customMessage)
        }

    }

}

module.exports = sern_handler
 