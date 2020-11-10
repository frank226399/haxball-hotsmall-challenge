import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onPlayerTeamChangeListener(changedPlayer: PlayerObject, byPlayer: PlayerObject | null): void {
    window.afkDetector.tickCounter = 0; // reset counter
    // logging
    if(byPlayer !== null) {
        logger.i(`${changedPlayer.name}#${changedPlayer.id} moved to other team(${changedPlayer.team}) by ${byPlayer.name}#${byPlayer.id}`);
    } else {
        logger.i(`${changedPlayer.name}#${changedPlayer.id} moved to other team(${changedPlayer.team}) by bot system.`);
    }

    window.playerList.get(changedPlayer.id).team = changedPlayer.team; //apply
}