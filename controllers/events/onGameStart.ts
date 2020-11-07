// TODO: stats update when stat-recording mode: total games
import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onGameStartListener(byPlayer: PlayerObject | null): void {
    // logging
    if(byPlayer !== null) {
        logger.i(`The game started by ${byPlayer.name}#${byPlayer.id}. CONN(${byPlayer.conn}),AUTH(${byPlayer.auth})`);
    } else {
        logger.i(`The game started by bot system.`);
    }
}