import { KickStack } from "../../models/BallKickTrace";
import { gameRule } from "../../models/gamerules/onebyone.rule";
import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import { roomPlayersNumberCheck } from "../RoomTools";

const logger: Logger = Logger.getInstance();

export function onGameStopListener(byPlayer: PlayerObject | null, ballKickStack: KickStack): void {
    logger.i(`The game stopped by bot system.`); //log it
    
    
    window.isGameNow = false; // mod switching

    ballKickStack.clear(); // clear the ball kick stack.
    
    var currentPlayersCount: number = roomPlayersNumberCheck(); // get how many players last

    if (currentPlayersCount >= gameRule.requisite.minimumPlayers) {
        var specPlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team == 0); // get spec team

        // The challenger will always be on the Blue Team.
        window.room.setPlayerTeam(specPlayers[0].id, 2);
        
        window.room.setCustomStadium(gameRule.defaultMap); // map change to for default matching map
        window.room.startGame(); // and start game 

    } else if(currentPlayersCount == 1) {
        window.room.setCustomStadium(gameRule.readyMap); // map change to for ready map
        window.room.startGame(); // and start game 
    }
}