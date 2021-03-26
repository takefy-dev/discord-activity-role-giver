# What is this ?

Give specific role to a member when he is streaming or he has is camera enable

# Installation

`npm i discord-activity-role-giver`

# Usage

```js
const Discord = require('discord.js');
const { AcitivityRole } = require('discord-activity-role-giver')
const client = new Discord.Client();
client.on('ready', () => {
    const roleGiver = new AcitivityRole(client, {
        stream : {
            enable : true,
            roleId: '807314663439859772'
        },
        cam: {
            enable: true,
            roleId: "804762548581695559"
        }
    })
    console.log("ready")
})
client.login('token')
```

## Options

This package require 2 options, both are required for the package to work :

* *Discord.Client*
* *Options* - _Object_  : 
```js 
        stream : {
            enable :  (true or false),
            roleId: 'roleId'
        },
        cam: {
            enable: (true or false),
            roleId: "roleId"
        }
```