import { RoomConfig } from "../models/RoomConfig";
import { LogMessage } from "../models/LogMessage";

declare global {
    interface Window {
        // bot
        logQueue: LogMessage[] // for sharing log message
        isStatRecord: boolean // TRUE means that recording stats now
        winStreakCount: number // how many wins straight (streak)

        // haxball
        HBInit(config: RoomConfig): any
        onHBLoaded(): void
    }
}