
import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onPlayerChatListener(player: PlayerObject, message: String): boolean {
    logger.i(`${player.name}#${player.id} said, "${message}`);
    return true;
}