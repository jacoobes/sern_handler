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