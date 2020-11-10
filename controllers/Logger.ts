// Log Level (lower level means more high priority)
// error 0, warn 1, info 2, http 3, verbose 4, debug 5, silly 6

import { LogMessage } from "../models/LogMessage";

export class Logger {
    // written in Singleton Pattern
    // If the bot created Logger object once, never create ever until the bot instance dead. 
    private static instance: Logger = new Logger();
    public static getInstance(): Logger {
        if (this.instance == null) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    private push(messageObject: LogMessage): void {
        window.logQueue.push(messageObject)
        
    }
    private pop(): LogMessage | undefined {
        return window.logQueue.pop();
    }

    /*
    public c(msg: string): void { // for common info log
        this.push({type: 2, context: msg});
    }
    */

    public i(msg: string): void { // for common info log
        this.push({type: 2, context: msg});
    }

    public e(msg: string): void { // for error log
        this.push({type: 0, context: msg});
    }

    public w(msg: string): void { // for warning log
        this.push({type: 1, context: msg});
    }

}

/*
USAGE EXAMPLE
let something: Logger = new Logger(); // It makes an error: constructor of 'Singleton' is private.
let instance: Logger = Logger.getInstance(); instace.blahbalh(); // now do something with the instance.
*/