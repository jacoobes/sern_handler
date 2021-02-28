let {payloadGet} = require('../data_events/payload')

let {owners, client} = payloadGet


async function getOwnerInfo() {
    
    let ownerInfo = await owners.map( async person => await client.users.fetch(person))

    return ownerInfo

    
}

module.exports.getOwnerInfo = getOwnerInfo