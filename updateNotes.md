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