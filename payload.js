const glob = require('glob')

class Payload {

    constructor(data = {commands: path, owners: owners, prefix: prefix, client: client}) {
        this.data = data
    }
    getPayload() {

        return this.data

    }

    detectPayloadFiles() {

    
    let commandCollection = new Map()
    let aliasCollection = new Map()

    const {join} = require('path')

 
    let {commands} = this.data

    let getCommands = join(require.main.path, commands)

    let getDirectories = function (src, callback) {
            return glob(src + '/**/*', callback)
        }


    getDirectories(getCommands, function (err, res) {

        if (err) {
            console.log('Error', err)
            return
        }


        let fileCollection = res
            .map((element) => (element.endsWith('js') ? element : undefined))
            .filter(Boolean)

        for (let module of fileCollection) {
            let moduleObj = require(module)

            commandCollection = commandCollection.set(moduleObj.name, require(module))

            for (let module of fileCollection) {
                let moduleObj = require(module)
                if (moduleObj.aliases != null) {

                    moduleObj.aliases.forEach((name) => {
                        aliasCollection = aliasCollection.set(name, require(module))
                    })
                }
            }
        }
    })

let allCommands = {
    commandCollection,
    aliasCollection
}
    
module.exports.allCommands = allCommands

    }

}

module.exports.Payload = Payload