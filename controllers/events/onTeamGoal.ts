import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { onTeamGoal } from "../../resources/lang";
import { KickStack } from "../../models/BallKickTrace";
import { setPlayerData } from "../../controllers/Storage";

const logger: Logger = Logger.getInstance();

export function onTeamGoalListener(team: number, ballKickStack: KickStack, room: any, playerList: any): void {
    // get who made this goal from ballKickStack and clear it
    var touchPlayer: number | undefined = ballKickStack.pop();
    ballKickStack.clear();
 
    // team naming by numeric ID
    var teamName: string = "Spec";
    switch (team) { // team number : Spectators: 0, Red Team: 1, Blue Team: 2
        case 1: {
            teamName = "Red";
            break;
        }
        case 2: {
            teamName = "Blue";
            break;
        }
    }

    // set placeholder data
    var placeholder = {
        targetID: playerList.get(touchPlayer).id
        ,targetName: playerList.get(touchPlayer).name
        ,targetTeamName: teamName
    }  

    // 
    if (window.isStatRecord == true && touchPlayer !== undefined) { // records when game mode is for stats recording.
        // 전적 처리 (골,  자책, 상대팀 실점+)
        if (playerList.get(touchPlayer).team == team) { // if the goal is N O T  OG
            logger.i(`${placeholder.targetName}#${placeholder.targetID} of Team ${teamName} made a goal.`); //logging
            playerList.get(touchPlayer).stats.goals++;
            setPlayerData(playerList.get(touchPlayer));

            // except spectators and filter who were lose a point
            var losePlayers: PlayerObject[] = room.getPlayerList().filter((player: PlayerObject) => player.team != 0 && player.team != team);
            losePlayers.forEach(function (eachPlayer: PlayerObject) {
                // records a lost point for counterpart
                playerList.get(eachPlayer.id).stats.losePoints++;
                setPlayerData(playerList.get(eachPlayer.id)); // updates lost points count
            });

            // send message for room when goal
            room.sendAnnouncement(Tst.maketext(onTeamGoal.goal, placeholder), null, 0x00FF00, "normal", 0);

        } else { // if the goal is OG
            logger.i(`${placeholder.targetName}#${placeholder.targetID} made an OG. Team ${teamName} got a score.`); //logging
            playerList.get(touchPlayer).stats.ogs++;
            setPlayerData(playerList.get(touchPlayer));

            // send message for room when OG
            room.sendAnnouncement(Tst.maketext(onTeamGoal.og, placeholder), null, 0x00FF00, "normal", 0);
        }
    }
}