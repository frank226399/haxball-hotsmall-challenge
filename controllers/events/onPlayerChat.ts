
import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import { isCommandString, parseCommand } from "../Parser";

const logger: Logger = Logger.getInstance();

export function onPlayerChatListener(player: PlayerObject, message: string): boolean {
    logger.i(`${player.name}#${player.id} said, "${message}`);
    if(isCommandString(message) == true) {
        parseCommand(player, message); // evaluate it
        return false; // say only to him/herself
    } else {
        return true; // say to all players
    }
}