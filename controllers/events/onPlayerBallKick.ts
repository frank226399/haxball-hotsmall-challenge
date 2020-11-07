import { KickStack } from "../../models/BallKickTrace";
import { PlayerObject } from "../../models/PlayerObject";

export function onPlayerBallKickListener(player: PlayerObject, ballKickStack: KickStack): void {
    ballKickStack.push(player.id); //record who kicked the ball
}