
const {
    Payload
} = require("./payload");

class CustomEventHandler extends Payload {


    async detectPayloadFiles() {
        let {
            join
        } = require('path')
        let fs = require('fs').promises


        let allEventsinDirectory = await fs.readdir(join(require.main.path, this.data.data.events), 'utf8')

        let events = []
        for (let i = 0; i < allEventsinDirectory.length; i++) {


            events.push(require(join(require.main.path, this.data.data.events, allEventsinDirectory[i])))
        }

        return [events, allEventsinDirectory]
    }

    async run() {

        let [events, allEventsinDirectory] = await this.detectPayloadFiles()

        this.data.data.client.removeAllListeners()


        for (let i = 0; i < events.length; i++) {
            let eventName = allEventsinDirectory[i].replace('.js', "")
            let eventCallback = events[i]
            this.data.data.client.on(eventName, eventCallback.bind(null, this.data.data.client))
        }


    }

}


module.exports.CustomEventHandler = CustomEventHandler