import { KickStack } from "../../models/BallKickTrace";
import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onGameStopListener(byPlayer: PlayerObject | null, ballKickStack: KickStack): void {
    // mod switching
    window.isGameNow = false;
    
    // logging
    if(byPlayer !== null) {
        logger.i(`The game stopped by ${byPlayer.name}#${byPlayer.id}. CONN(${byPlayer.conn}),AUTH(${byPlayer.auth})`);
    } else {
        logger.i(`The game stopped by bot system.`);
    }

    ballKickStack.clear(); // clear the ball kick stack.
}