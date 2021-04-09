const 
    sern_handler
 = require("../mainExecutor/executor");

let {
    join
} = require('path');

let fs = require('fs').promises;

class CustomEventHandler extends sern_handler {

    /**
     * Create custom events
     * @param {Payload} payload - instance of Payload 
     * @param {Boolean} overrideAllListeners - remove all current listeners.
     */

    constructor(payload, overrideAllListeners) {

        super(payload)

        if (payload.data.events == null) {
            console.log(payload)
            throw new Error('Cannot find your events folder.')

        } else {

            async function detectPayloadFiles() {

                let allEventsinDirectory = await fs.readdir(join(require.main.path, payload.data.events), 'utf8')

                let events = []

                for (let i = 0; i < allEventsinDirectory.length; i++) {

                    events.push(require(join(require.main.path, payload.data.events, allEventsinDirectory[i])))
                }

                return [events, allEventsinDirectory]

            };

           (async function () {

                let [events, allEventsinDirectory] = await detectPayloadFiles()

                if (overrideAllListeners) {
                    payload.data.client.removeAllListeners()
                }
               

                for (let i = 0; i < events.length; i++) {

                    let listener = events[i].listener
                    let callback = events[i].callback

                    let eventName = allEventsinDirectory[i].replace('.js', "")
                    payload.data.client[listener](eventName, callback.bind(null, payload))
                        
                }



            })();
            
        }

    } 
    
    isNotValidMessage(message) {
      
        return message.author.bot || !message.content.toLowerCase().startsWith(this.payload.data.prefix);
    }

   get commandsAndAliases() {

        let commandsAndAliases = this.payload.commands()
        
        return new Promise(resolve => {
            resolve(commandsAndAliases)
        })
    }
  async fetchEmittedCommand(message) {
    let formattedMessage =  this.formatMessage(message)
    
   let {commandCollection, aliasCollection } = await this.commandsAndAliases 

    let command = commandCollection.get(formattedMessage[0]) || aliasCollection.get(formattedMessage[0]) || null
    return command
        
   }
formatMessage(message) {

return message.content.slice(this.payload.data.prefix.length).trim().split(/\s+/g)
}

async displayOptions(wantsLog  = {consoleCommands : false, consoleRAM: false, customMessage: false, consoleEvents: false}) {

    super.displayOptions({
        consoleCommands: wantsLog.consoleCommands,
        consoleRAM: wantsLog.consoleRAM,
        customMessage: wantsLog.customMessage

    })
    if(wantsLog.consoleEvents) {
        let allEventsinDirectory = await fs.readdir(join(require.main.path, this.payload.data.events), 'utf8')
        if(allEventsinDirectory == undefined) {
            console.log("No events found!")
            return;
        }
        for (let eventName of allEventsinDirectory) {
            eventName = eventName.replace('.js', "")
            console.log(`Loading ... ${eventName} event` )
        }
    


    }

}

}



module.exports = CustomEventHandler