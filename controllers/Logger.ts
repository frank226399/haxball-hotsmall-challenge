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

    private push(msg: string): void {
        window.logQueue.push(msg);
    }
    private pop(): string | undefined {
        return window.logQueue.pop();
    }

    public c(msg: string): void { // for common log
        this.push(msg);
    }
}

/*
USAGE EXAMPLE
let something: Logger = new Logger(); // It makes an error: constructor of 'Singleton' is private.
let instance: Logger = Logger.getInstance(); instace.blahbalh(); // now do something with the instance.
*/