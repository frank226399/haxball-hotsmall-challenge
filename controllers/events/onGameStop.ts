import { KickStack } from "../../models/BallKickTrace";
import { PlayerObject } from "../../models/PlayerObject";

export function onGameStopListener(byPlayer: PlayerObject, ballKickStack: KickStack): void {
    
    ballKickStack.clear(); // clear the ball kick stack.
}