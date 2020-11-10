export function isCommandString(message: string): boolean {
    if(message.charAt(0) == "!") {
        // If message has '!' as first character in it's string, return true.
        return true;
    } else {
        return false;
    }
}