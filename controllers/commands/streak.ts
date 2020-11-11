import * as Tst from "../Translator";
import { PlayerObject } from "../../models/PlayerObject";
import { command } from "../../resources/lang";

export function cmdStreak(byPlayer: PlayerObject): void {
    var placeholder ={
        streakCount: window.winStreakCount
    }
    window.room.sendAnnouncement(Tst.maketext(command.streak, placeholder), byPlayer.id, 0x479947, "normal", 1);
}