

const chalk = require('chalk')


// const commandHandler = (() => {

//     const chalk = require('chalk')
//     const glob = require('glob')
//     let commandCollection = new Map()
//     let aliasCollection = new Map()
    
//     const {
//         Client
//     } = require('discord.js')
//     const client = new Client()

//     let getDirectories = function (src, callback) {
//         return glob(src + '/**/*', callback)
//     }


//     const {join} = require('path')
//     let getCommands = join(require.main.path, '/commands')
//     getDirectories(getCommands, function (err, res) {

//         if (err) {
//             console.log('Error', err)
//             return
//         }

//         let fileCollection = res
//             .map((element) => (element.endsWith('js') ? element : undefined))
//             .filter(Boolean)

//         for (let module of fileCollection) {
//             let moduleObj = require(module)

//             commandCollection = commandCollection.set(moduleObj.name, require(module))

//             for (let module of fileCollection) {
//                 let moduleObj = require(module)
//                 if (moduleObj.aliases != null) {

//                     moduleObj.aliases.forEach((name) => {
//                         aliasCollection = aliasCollection.set(name, require(module))
//                     })
//                 }
//             }
//         }
//     })

//     return {


//         commandInfo: function () {
//             let {
//                 message
//             } = require('../discord-bot/.')
//             let messageEmitted = message.content.split(/\s+/g)

//             let commandInfo = {
//                 message: message,
//                 argument: messageEmitted,
//             }

//             return commandInfo
//         },

//         /**
//          *
//          * @param {Object} wantsLog - Options to customize console output
//          * @param {boolean} wantsLog.consoleCommands - Outputs all detected commands
//          * @param {boolean} wantsLog.consoleRAM - Outputs RAM usage
//          * @param {string}  wantsLog.customMessage - Option to output custom message
//          */

       

//         /**
//          * Executes all commands
//          */
//         commandExecuter: function () {
            
//             let {
//                 message,
//                 argument
//             } = this.commandInfo()

//             let config = require(`../discord-bot/config.prefix`)
//             if (message.content.toLowerCase().startsWith(config.prefix)) {

//                 const {
//                     Argument
//                 } = require('./Argument/argumentHandler')

//                 let messageEmitted =
//                     aliasCollection.get(argument[1].toLowerCase()) ||
//                     commandCollection.get(argument[1].toLowerCase()) ||
//                     null

//                 let {
//                     usesArguments: {
//                         array,
//                         argType,
//                         validate
//                     }
//                 } = messageEmitted
//                 let {usesArguments} = messageEmitted

//                 if (!this.hasUserPermissions()) return;

//                 if (usesArguments) {

//                     let test = new Argument(argument, array, argType, validate)

//                     test.setArray()
//                     test.setType()

//                     if (test.ensureValidationFunction() == false) return message.reply(`\`${test.argument}\` is not valid.`)

//                     try {

//                         messageEmitted.callback(client, message, test)

//                     } catch (e) {
//                         console.error(e)
//                         message.reply('No command found')
//                     }
//                 } else {

//                     try {

//                         messageEmitted.callback(client, message)

//                     } catch (e) {
//                         console.error(e)
//                         message.reply('No command found')
//                     }


//                 }



//             }
//         },

//         hasUserPermissions: function () {

//             let {
//                 message,
//                 argument
//             } = this.commandInfo()

//             let {
//                 member
//             } = message
//             let name = argument[1]


//             let command = commandCollection.get(name) || aliasCollection.get(name) || null

//             if (member.permissions.has('ADMINISTRATOR')) {
//                 return true
//             } else if (!command.userPermissions) {
//                 return true
//             } else {
//                 const allValidPermissions = [
//                     'CREATE_INSTANT_INVITE',
//                     'KICK_MEMBERS',
//                     'BAN_MEMBERS',
//                     'ADMINISTRATOR',
//                     'MANAGE_CHANNELS',
//                     'MANAGE_GUILD',
//                     'ADD_REACTIONS',
//                     'VIEW_AUDIT_LOG',
//                     'PRIORITY_SPEAKER',
//                     'STREAM',
//                     'VIEW_CHANNEL',
//                     'SEND_MESSAGES',
//                     'SEND_TTS_MESSAGES',
//                     'MANAGE_MESSAGES',
//                     'EMBED_LINKS',
//                     'ATTACH_FILES',
//                     'READ_MESSAGE_HISTORY',
//                     'MENTION_EVERYONE',
//                     'USE_EXTERNAL_EMOJIS',
//                     'VIEW_GUILD_INSIGHTS',
//                     'CONNECT',
//                     'SPEAK',
//                     'MUTE_MEMBERS',
//                     'DEAFEN_MEMBERS',
//                     'MOVE_MEMBERS',
//                     'USE_VAD',
//                     'CHANGE_NICKNAME',
//                     'MANAGE_NICKNAMES',
//                     'MANAGE_ROLES',
//                     'MANAGE_WEBHOOKS',
//                     'MANAGE_EMOJIS',
//                 ]
//                 for (let aPermission of allValidPermissions) {
//                     if (!member.permissions.has(aPermission)) {
//                         message.reply(
//                             `You do not have the correct permissions to use ${command.name}`
//                         )
//                         return
//                     }
//                 }
//             }
//         },




//     }
// })()

class CommandIpsum {

    constructor(payload) {
        this.payload = payload

    }

   defaultRun() {
        let {client, prefix} = this.payload.getPayload()

        const {Argument} = require('./Argument/argumentHandler')

        const {allCommands: {aliasCollection, commandCollection}} = require('./payload')


        
        client.on('message',  message => {

            if(message.author.bot) return;
            if(!message.content.toLowerCase().startsWith(prefix)) return;      
            
            let messageEmitted = message.content.split(/\s+/g)
            
            if(!aliasCollection.has(messageEmitted[1]) || !commandCollection.has(messageEmitted[1])) {return message.reply('Command not found.')}

            
            
            let command = aliasCollection.get(messageEmitted[1]) || commandCollection.get(messageEmitted[1])
            let {usesArguments: {argType, array, validate}} = command
            let argument = new Argument(messageEmitted, array, argType, validate)

            command.callback(client, message, argument)

        })

    }
    





 displayOptions(wantsLog = {
    consoleCommands: false,
    consoleRAM: false,
    customMessage: false
}) {

let {allCommands: {commandCollection}} = require('./payload')

let {consoleCommands, consoleRAM, customMessage} = wantsLog

    if (consoleCommands) {
        let commandTable = {}
        for (let [key, value] of commandCollection) {
            value.description == undefined ?
                (value.description = ``) :
                (commandTable[key] = value.description)
        }
        console.log(chalk.bold.redBright('Registering:'))
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


module.exports = {CommandIpsum}