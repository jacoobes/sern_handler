const {
    sern_handler
} = require("../mainExecutor/executor");

let {
    join
} = require('path')
let fs = require('fs').promises

class CustomEventHandler extends sern_handler {

    /**
     * Create custom events
     * @param {Payload} payload - instanceof Payload 
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

            }

            let run = (async function () {

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



            })()


        }
    }





}


module.exports = CustomEventHandler