import { RoomConfig } from "../models/RoomConfig";
import { LogMessage } from "../models/LogMessage";

declare global {
    interface Window {
        // bot
        logQueue: LogMessage[] // for sharing log message
        
        // haxball
        HBInit(config: RoomConfig): any
        onHBLoaded(): void
    }
}