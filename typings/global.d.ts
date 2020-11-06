import { RoomConfig } from '../models/RoomConfig';
declare global {
    interface Window {
        // bot
        logQueue: string[] // for sharing log message
        
        // haxball
        HBInit(config: RoomConfig): any
        onHBLoaded(): void
    }
}