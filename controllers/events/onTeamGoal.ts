import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { onTeamGoal } from "../../resources/lang";
import { KickStack } from "../../models/BallKickTrace";
import { setPlayerData } from "../../controllers/Storage";

const logger: Logger = Logger.getInstance();

export function onTeamGoalListener(team: number, ballKickStack: KickStack): void {
    switch(team) {
        case 1: { // when red goals
            window.afkDetector.teamPicker = 2; // now blue'sturn
            break;
        }
        case 2: { // when blue goals
            window.afkDetector.teamPicker = 1; // now red'sturn
            break;
        }
        default: {
            window.afkDetector.teamPicker = 0; // default value
            break;
        }
    }
    // get who made this goal from ballKickStack and clear it
    var touchPlayer: number | undefined = ballKickStack.pop();
    window.afkDetector.tickCounter = 0; // reset counter
    ballKickStack.clear();

    if(touchPlayer === undefined) {
        touchPlayer = 0; //trick...
    }
 
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
        targetID: window.playerList.get(touchPlayer).id
        ,targetName: window.playerList.get(touchPlayer).name
        ,targetTeamName: teamName
    }  

    // 
    if (window.isStatRecord == true && touchPlayer !== undefined) { // records when game mode is for stats recording.
        // 전적 처리 (골,  자책, 상대팀 실점+)
        if (window.playerList.get(touchPlayer).team == team) { // if the goal is N O T  OG
            logger.i(`${placeholder.targetName}#${placeholder.targetID} of Team ${teamName} made a goal.`); //logging
            window.playerList.get(touchPlayer).stats.goals++;
            setPlayerData(window.playerList.get(touchPlayer));

            // except spectators and filter who were lose a point
            var losePlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team != 0 && player.team != team);
            losePlayers.forEach(function (eachPlayer: PlayerObject) {
                // records a lost point for counterpart
                window.playerList.get(eachPlayer.id).stats.losePoints++;
                setPlayerData(window.playerList.get(eachPlayer.id)); // updates lost points count
            });

            // send message for room when goal
            window.room.sendAnnouncement(Tst.maketext(onTeamGoal.goal, placeholder), null, 0x00FF00, "normal", 1);

        } else { // if the goal is OG
            logger.i(`${placeholder.targetName}#${placeholder.targetID} made an OG. Team ${teamName} got a score.`); //logging
            window.playerList.get(touchPlayer).stats.ogs++;
            setPlayerData(window.playerList.get(touchPlayer));

            // send message for room when OG
            window.room.sendAnnouncement(Tst.maketext(onTeamGoal.og, placeholder), null, 0x00FF00, "normal", 1);
        }
    }
}