import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onStadiumChangeListner(newStadiumName: string, byPlayer: PlayerObject): void {
    // Event called when the stadium is changed.
    // log it
    logger.i(`The map (${newStadiumName}) has opened by system.`);
}