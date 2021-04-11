# 1.0.0 
intial publish
some README errors

# 1.0.1 
uninstalled overload.js package as was not using it
fixed some minor README errors

# 1.0.2 

fixed some minor README errors

# 1.0.3 

fixed some minor README errors

# 1.0.4

**Payload**
-setCommands method renamed to commands


**CustomEventHandler support**
- new method `isValidMessage`
    - @returns boolean => author of message is bot or does not start with prefix
- new property `commandsAndAliases`
    - glorified payload.commands() method but in a property.
    - is a Promise so must you must resolve it.
-new method `fetchEmittedCommand`
    -@returns Object of `payload.data.commands`, mapped by the command emitted.
-fixed bug that made whole handler not work. oops!

# 1.0.5

-fixed argType was required bug

# 1.0.6 - 1.0.8

- fixed other bugs
- undefined errors fixed

# 1.0.9

- required Argument class bug

# 1.10.0 

- fixed some README errors again lol
    - some hyperlinks were broken, updates and quick docs were fixed
    - ~~class sern_handler extends CustomEventHandler~~ -> class customEventHandler extends sern_handler
    - added some needed info to access Argument.utils functions 
- new documentation on Argument class to help ease custom event creation
- `argument.type()` is now a property instead of method.
- a few more methods added to customEventHandler! check README
- this update may be unstable. If you encounter bugs, please report. Check README.

# 1.10.1

- Added some changes to readme, forgot to add in original update. ^

# 1.10.3

-added a static Argument.paginate method to paginate embeds
    - credit to [cheems](https://github.com/canta-slaus)
- added joinedAt function to validate closure which checks when a member joined.
- added hasRole function to validate closure which checks if member has roles

# 1.10.4

-fixed a bug where if you had a string and another argType, you would get an error
-added to docs 
    - make sure to optional chain your validate function

# 1.10.5
-added new displayOptions for CustomEventHandler
    - consoleEvents to display detected events of the CustomEventHandler
- I need to specify that custom Events are currently not supported by default sern_handler. You can add your own events, but sern_handler will not take care of it. This will change in the future, but if you plan to use other eventss such as GuildMemberAdd or others, sern_handler does not detect these. Read docs for more information.
- Remember if you are experiencing bugs, please report them to me to get them fixed ASAP!

# 1.10.7 
-fixed a bug where if you had a number in your arguments, its type would be string.