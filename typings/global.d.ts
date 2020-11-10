import { RoomConfig } from "../models/RoomConfig";
import { LogMessage } from "../models/LogMessage";

declare global {
    interface Window {
        // bot
        logQueue: LogMessage[] // for sharing log message
        isStatRecord: boolean // TRUE means that recording stats now
        isGameNow: boolean // is playing now?
        winStreakCount: number // how many wins straight (streak)
        playerList: Map // playerList:Player[] is an Map object. // playerList.get(player.id).name; : usage for playerList
        afkDetector: { // Away from Keyboard user detecting
            tickCounter: number // counting for game tick
            teamPicker: number // who's turn kick the ball
            redActivity: boolean // is Red player on activity?
            blueActivity: boolean // is Blue player on activity?
        }
        // haxball
        room: any // room container
        HBInit(config: RoomConfig): any
        onHBLoaded(): void
    }
}