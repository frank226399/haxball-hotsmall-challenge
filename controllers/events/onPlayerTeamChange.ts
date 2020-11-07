import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onPlayerTeamChangeListener(changedPlayer: PlayerObject, byPlayer: PlayerObject | null): void {
    // logging
    if(byPlayer !== null) {
        logger.i(`${changedPlayer.name}#${changedPlayer.id} moved to other team(${changedPlayer.team}) by ${byPlayer.name}#${byPlayer.id}`);
    } else {
        logger.i(`${changedPlayer.name}#${changedPlayer.id} moved to other team(${changedPlayer.team}) by bot system.`);
    }
}