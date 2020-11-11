import { PlayerObject } from "../../models/PlayerObject";
import { command } from "../../resources/lang";

export function cmdHelp(byPlayer: PlayerObject, message?: string): void {
    if(message !== undefined) {
        switch(message) {
            case "about": {
                window.room.sendAnnouncement(command.helpman.about, byPlayer.id, 0x479947, "normal", 1);
                break;
            }
            case "help": {
                window.room.sendAnnouncement(command.helpman.help, byPlayer.id, 0x479947, "normal", 1);
                break;
            }
            case "stats": {
                window.room.sendAnnouncement(command.helpman.stats, byPlayer.id, 0x479947, "normal", 1);
                break;
            }
            case "streak": {
                window.room.sendAnnouncement(command.helpman.streak, byPlayer.id, 0x479947, "normal", 1);
                break;
            }
            case "rank": {
                window.room.sendAnnouncement(command.helpman.rank, byPlayer.id, 0x479947, "normal", 1);
                break;
            }
            default: {
                window.room.sendAnnouncement(command.helpman._ErrorWrongMan, byPlayer.id, 0xFF7777, "normal", 2);
                break;
            }
        }
    } else {
        window.room.sendAnnouncement(command.help, byPlayer.id, 0x479947, "normal", 1);
    }
}