class ActivityRole {
    constructor(client, options) {
        if (!client) throw new Error('Client was not found. Please enter Client as option');
        if (!options) throw new Error('No options was provided. Please provide some options');
        /**
        * The Discord Client
        * @type {Discord.Client}
        */
        this.client = client;
        /**
     * The options such as role ids, if it's enabled or not
     * {s
     *  stream : {enable: true, roleId: ""}
     *  cam : {enable: true, roleId: ""}
     * }
     * @type {Object}
     */
        this.options = options;

        const streamRoleId = this.options.stream.roleId;
        const camRoleId = this.options.cam.roleId;
        if (!camRoleId) throw new Error('No correct cam roleId was provided');
        if (!streamRoleId) throw new Error('No correct stream roleId was provided');

        this.client.on('voiceStateUpdate', (oldState, newState) => {
            if (!newState) return;
            const guild = oldState.guild;
            const streamRole = guild.roles.cache.get(streamRoleId);
            const camRole = guild.roles.cache.get(camRoleId);

            if (!streamRole) throw new Error(`Stream role not found`);
            if (!camRole) throw new Error(`Cam role not found`);

            if (this.options.stream.enable) {
                //STREAMING START
                console.log('STREAMING START')
                if (!oldState.streaming && newState.streaming) {
                    if (newState.member.roles.cache.has(streamRole.id)) return;
                    oldState.member.roles.add(streamRole, `Streaming role`);
                }
                // STREAMING STOP
                if (oldState.streaming && !newState.streaming) {
                    if (!newState.member.roles.cache.has(streamRole.id)) return;
                    oldState.member.roles.remove(streamRole, `Streaming role`);
                }
            }
            if (this.options.cam.enable) {
                // CAM START
                if (!oldState.selfVideo && newState.selfVideo) {
                    if (newState.member.roles.cache.has(camRole.id)) return;
                    oldState.member.roles.add(camRole, `Cam role`)
                }
                // CAM STOP

                if (oldState.selfVideo && !newState.selfVideo) {
                    if (!newState.member.roles.cache.has(camRole.id)) return;
                    oldState.member.roles.remove(camRole, `Cam role`)
                }
            }


        })



    }

}
module.exports = ActivityRole;