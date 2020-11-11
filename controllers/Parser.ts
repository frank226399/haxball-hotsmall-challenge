import { PlayerObject } from "../models/PlayerObject";
import { command } from "../resources/lang";
import { cmdAbout } from "./commands/about";
import { cmdHelp } from "./commands/help";
import { cmdRank } from "./commands/rank";
import { cmdStats } from "./commands/stats";
import { cmdStreak } from "./commands/streak";

// if given string is command chat, this function returns true, nor false.
export function isCommandString(message: string): boolean {
    if(message.charAt(0) == "!") {
        // If message has '!' as first character in it's string, return true.
        return true;
    } else {
        return false;
    }
}

// divide into 3 parts by sperator. !COMMAND FIRST-ARG SECOND-ARG
export function getCommandChunk(message: string): string[] { 
    return message.split(" ", 3);
}

// parse command message and excute it (need to check if it's command)
export function parseCommand(byPlayer:PlayerObject, message: string): void {
    var msgChunk: string[] = getCommandChunk(message);
    switch(msgChunk[0]) {
        case "!help": {
            if(msgChunk[1] !== undefined) {
                cmdHelp(byPlayer, msgChunk[1]);
            } else {
                cmdHelp(byPlayer);
            }
            break;
        }
        case "!about": {
            cmdAbout(byPlayer);
            break;
        }
        case "!stats": {
            if(msgChunk[1] !== undefined) {
                cmdStats(byPlayer, msgChunk[1]);
            } else {
                cmdStats(byPlayer);
            }
            break;
        }
        case "!streak": {
            cmdStreak(byPlayer);
            break;
        }
        case "!rank": {
            cmdRank(byPlayer);
            break;
        }
        default: {
            window.room.sendAnnouncement(command._ErrorWrongCommand, byPlayer.id, 0xFF7777, "normal", 2);
            break;
        }
    }
}

