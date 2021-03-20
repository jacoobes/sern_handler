class Payload {

    constructor(data = {
        commands: path,
        events: eventPath,
        owners: owners,
        prefix: prefix,
        client: client
    }) {
        this.data = data;


    }

    /**
     * 
     * Gets all file directories and puts it into an Array.
     */
    
    async #fileCache() {

        const {
            join
        } = require('path')

        let commands = this.data.commands

        let commandsPath = join(require.main.path, commands)


        const {
            resolve
        } = require('path');
        const {
            readdir
        } = require('fs').promises;

        //let categories = await readdir(commandsPath, 'utf8')

        async function getFiles(dir) {
            const dirents = await readdir(dir, {
                withFileTypes: true
            });
            const files = await Promise.all(dirents.map((dirent) => {
                const res = resolve(dir, dirent.name);
                return dirent.isDirectory() ? getFiles(res) : res;
            }));
            return Array.prototype.concat(...files);
        }


        let allRegisteredFiles = await getFiles(commandsPath)

        return allRegisteredFiles


    }
    
    /**
     * 
     * @returns {Promise} Map of all registered commands
     * @returns {Promise} Map of all registered aliases 
     * 
     */

    async commands() {

        let fileCollection = await this.#fileCache()

        let commandCollection = new Map()
        let aliasCollection = new Map()


        for (let i = 0; i < fileCollection.length; i++) {

            let file = require(fileCollection[i])

            commandCollection.set(file.name, file)


        }

        for (let i = 0; i < fileCollection.length; i++) {

            let file = require(fileCollection[i])

            let aliases = file.aliases || undefined

            if (aliases != null) {
                for (let j = 0; j < aliases.length; j++) {

                    aliasCollection.set(aliases[j], file)

                }
            }

        }

        return {
            commandCollection,
            aliasCollection
        }
    }

  

}




module.exports = Payload