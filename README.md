# sern_handler  1.0.2
 
sern_handler is a flexible, setup-friendly, utility package for your discord bot. Easy-to-use features and lots of customization. </br >

[**Documentation**](#Quick-Docs-📜)  
[**Upcoming Updates**](#Upcoming-Changes-/-Updates) </br >
[**Source**](https://github.com/jacoobes/sern_handler)
## Installation ▶️

```bash
npm install sern_handler
```
## Usage ▶️

```js
//Basic Setup
const {sern_handler, Payload} = require('sern_handler')

const payload = new Payload( 
{commands: '/yourCommandsFolder', //folder where all commands are located.          
owners: ['182326315813306369'],  //String [] of Discord ID(s)
prefix: 'tcp',                   //prefix for your bot
client: client                   //instance of Discord.Client
})                              

const handler = new sern_handler(payload) //default Message event enabled

```
If you want **custom events** enabled, add to your Payload the `events` header:
```js
//{commands : '/yourCommandsFolder',
events: '/yourEventsFolder',
//owners: ['182326315813306369'] 
``` 

And require the CustomEventHandler instead: <br />
❗️ **NOTE**: Using the custom event handler will disable all default events! <br />
( **v1.0** > More features for custom event handlers will come eventually ) 
```js
/**
* Create custom events
* @param {Payload} payload - instanceof Payload 
* @param {Boolean} overrideAllListeners - remove all current listeners.
*/

const handler = new CustomEventHandler(payload, true) 

//you should export the custom event handler for more functionality.

module.exports.handler = handler
```

### Event file 

```js
//Name of file is the name of listener. For example, this file is "ready.js"
//this is a "ready" event
const {handler} = require("your main file")
module.exports = {

    listener: 'on',                     // the type of listener
    callback: (payload, message) => {   // callback for when event is emitted
    
    handler.displayOptions({
      consoleRAM: true                 //consoles RAM usage
    })
    
    }

}
```

```js
//What should an event look like?


```

# Quick Docs 📜

## **class sern_handler** 

  ### `constructor : (payload : Payload)` ### 
  **methods** :

<ul> 
 <li> <b>displayOptions</b> ( {consoleCommands : boolean, consoleRAM: boolean, customMessage: string} ) @void
    <ul> 
    <li> consoleCommands - (optional) prints a table of all detected commands in your payload.
    <li> consoleRAM - (optional) prints statistics of RAM usage of discord bot.
    <li> customMessage - (optional) any message to be printed.
    </ul>    
</ul>

 - - - -
 ## **class sern_handler extends CustomEventHandler**

  ### `constructor : (payload : Payload)` ### 
  **methods** :
   [all super() methods](##**class-sern_handler**) 
- - - -
## **class Payload**

  ### `constructor : (data :  {commands: string, events: string, owners: String[] , prefix: string, client: Discord.Client } )` ### 
  **methods** :

<ul> 
 <li> <b>setCommands</b> @returns <b>Object &ltPromise&ltMap&gt&gt </b> 
    <ul> 
    <li> aliasCollection : aliases for commands mapped to a file</li>
    <li> commandCollection : command names mapped to a file</li>
    </ul>    
</ul>

- - - -

## **class Argument**

  ### `constructor : (argument : String [], array : boolean, argType : string, validate: Function )` ### 

  Extra variables: </br>
  `utils : {check (message: Message) }` </br>

  A bunch of util functions packed in a closure function. More info in command file section

  **methods** : 

<ul> 
 <li> <b>setArray</b> @returns <b> String [] || string </b> 
 <li> <b>type </b> @returns <b> string </b>
 <li> <b>ensureValidationFunction </b> @returns <b> boolean </b>
 <li> <b> STATIC randomInt (min, max) </b> @returns <b> integer </b>
 <li> <b> STATIC getMentions (argument: string || String[] , message: Message  ) </b> @returns <b> Object&ltDiscord.Collection&gt</b>
  <ul>
    <li> finds all roles / members mentioned in a give message.
  </ul>
</ul>

- - - -
### **Command Files**
- - - - 
A barebone, minimal command file should look something like the following. In other words, these headers are required for every command : 
```js
module.exports = {
  name: "profile",                                      // name of command
  description: "shows user profile",                    // a description
  callback: async (payload, message) => {               // function to run command
  
  },
};
```
No arguments were attached, and the command would only activate when a user uses `prefix + profile`.

You can build this simple skeleton into something more complex : 

```js
module.exports = {
  name: "profile", 
  description: "shows user profile",
  usesArguments: {                                    
     array: true,                                     
     argType: 'flex flex',                            
     validate: (args) => {                            
       return args[0] === 'Baloney'
     },
     validateError: "Not valid, bro",                 
     noArgumentsError: "No arguments were attached",
     typeError: "Incorrect types received"   
   },
  aliases: ["p", "prof", "profil"],
  ownerOnly: false,                                  
  notOwnerError: "You do not have perms.",            

  callback: async (payload, message, {argument, utils: {check}}) => { 
  
     console.log(argument.argument)
  },
};

```
**usesArguments** : required if you want to enable argument handling of a commmand <br />
**array** : do you want an array of arguments, split bu a space? <br/>
**argType** : For each argument wanted in the command, type check each. </br>
</br>

❗️**NOTE**: If you want arguments attached, the `array` and `argType` header are required. </br>
❗️**NOTE**: if `array` is false, `argType` must be one string only. </br>
<b><u>Supported Types :</u></b>
  <ul> 
  <li> <b>Flex</b>
    <ul> 
      <li> will not type check
    </ul>
  <li> <b>String</b>
  <li> <b>Number</b>
    <ul>
      <li> will not differentiate between Integer or Decimal
      </ul>
  <li> Integer
  <li> Decimal
  <li> Character
  </ul>

**validate** : validator function with parameter of your arguments. must return Boolean </br>
**validateError**: Optional error message instead of default. </br>
**noArgumentsError** : Optional no arguments error instead of default. </br>
**ownerOnly** : accessible to owners given by the payload </br>
**notOwnerError** : Optional not owner error instead of given default. </br>
**typeError** : Optional not type error instead of given default. </br>


### Let's break down the callback function really quickly. 
```js

 callback: async (payload, message, argument) => { 
  
     console.log(argument.argument)
  },
};

```
You can make the function async. </br>
**payload** is your Payload instance </br>
**message** is from a message event </br>
**argument** is an instance of Argument.  Meaning, you need to destructure it for its properties or access it by dot notation. view: [Argument](##class-Argument)</br>
</br>
Argument parameter is packed with some util functions that can make coding easier.
If you are unfamiliar with closures and nested functions (which will be structure of most `argument.util` functions), view docs [here](https://javascript.info/closure). Another [resource](https://www.youtube.com/watch?v=71AtaJpJHw0).
```
//closure function

argument.utils.check(message) -> 

@returns

function isNSFW () -> @returns boolean, checks if channel is NSFW
function memberHave(permissions: PermissionsResolvable as string) -> @returns boolean, checks if person sending message has these permissions.

```
### **Upcoming Changes / Updates** ###

This list goes in descending order of priority.

- [❌] More support for CustomEventHandler
  - [❌] Make Argument Class more flexible for custom events
- [❌] Refactoring code
- [❌] More argument utils functions
- [❌] More argument customization
- [❌] (Possible) Making command loading more efficient ?
- [❌] Cleaner docs.
- [❌] Cleaner argument handling.
- [❌] Per server options

## Bugs 🐛/ Suggestions ❓
Report [here](https://discord.gg/KRDNjsmbqv)