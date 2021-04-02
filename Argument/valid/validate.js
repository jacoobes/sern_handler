module.exports.validate = function validate(message) {


    return [function isNSFW() {

            //maybe add object options to add if nsfw is detected
            return message.channel.nsfw
        },

        function memberHave(permError = 'You do not have permissions to use this command.', ...permissions) {

            const allValidPermissions = [
                'CREATE_INSTANT_INVITE',
                'KICK_MEMBERS',
                'BAN_MEMBERS',
                'ADMINISTRATOR',
                'MANAGE_CHANNELS',
                'MANAGE_GUILD',
                'ADD_REACTIONS',
                'VIEW_AUDIT_LOG',
                'PRIORITY_SPEAKER',
                'STREAM',
                'VIEW_CHANNEL',
                'SEND_MESSAGES',
                'SEND_TTS_MESSAGES',
                'MANAGE_MESSAGES',
                'EMBED_LINKS',
                'ATTACH_FILES',
                'READ_MESSAGE_HISTORY',
                'MENTION_EVERYONE',
                'USE_EXTERNAL_EMOJIS',
                'VIEW_GUILD_INSIGHTS',
                'CONNECT',
                'SPEAK',
                'MUTE_MEMBERS',
                'DEAFEN_MEMBERS',
                'MOVE_MEMBERS',
                'USE_VAD',
                'CHANGE_NICKNAME',
                'MANAGE_NICKNAMES',
                'MANAGE_ROLES',
                'MANAGE_WEBHOOKS',
                'MANAGE_EMOJIS',
            ]

            const findMatch = (a, b) => a.reduce((acc, c) => {
                acc.total_match = a.filter(x => b.includes(x)).length
                acc.not_match = a.filter(x => !b.includes(x))
                return acc
            }, {
                total_match: 0
            })

            let gaveNoValidParams = findMatch(permissions, allValidPermissions).total_match

            if (gaveNoValidParams == 0) {

                throw new SyntaxError('Not valid permission! choose from ' + allValidPermissions)
            }
            for (let givenPerms of permissions) {

                if (!message.member.permissions.has(givenPerms)) {

                    message.reply(permError)
                    return false
                }
                
            }

            return true;
        },
        /**
         * 
         * @param {Date} date 
         */
        function joinedAt() {
            return message.member.joinedAt

        },
          /**
         * 
         * @param {String[]} id - All ids to be checked in an Array
         * @param {Boolean} all - Strictly check if member has all roles or just some
         */
        function hasRole(id = []) {
            
            let roleCheck = message.member.roles.cache.some(r=>id.includes(r.id))
            
           return roleCheck
          
        }
        

    ]


}