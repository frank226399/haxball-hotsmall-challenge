import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { onTeamVictory } from "../../resources/lang";
import { setPlayerData } from "../../controllers/Storage";
import { ScoresObject } from "../../models/ScoreObject";

const logger: Logger = Logger.getInstance();

export function onTeamVictoryListener(scores: ScoresObject): void {
    //set placeholder
    var placeholder = {
        targetID: 0
        ,targetName: ''
        ,targetTeamName: ''
        ,redScore: scores.red
        ,blueScore: scores.blue
        ,streakWinCount: window.winStreakCount
    }  
    window.afkDetector.tickCounter = 0; // reset counter
    if (window.isStatRecord == true) { // only when stats recording mode
        var winTeamFlag: number;

        var gamePlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team != 0); // except Spectators players
        var redPlayer: PlayerObject[] = gamePlayers.filter((player: PlayerObject) => player.team == 1); // except non Red players
        var bluePlayer: PlayerObject[] = gamePlayers.filter((player: PlayerObject) => player.team == 2); // except non Blue players

        if(scores.red > scores.blue) {
            logger.i(`${redPlayer[0].name}#${redPlayer[0].id}(Red) won this game. CONN(${redPlayer[0].conn}),AUTH(${redPlayer[0].auth})`);

            winTeamFlag = 1; // if Red wins
            placeholder.targetID = redPlayer[0].id;
            placeholder.targetName = redPlayer[0].name;
            placeholder.targetTeamName = "Red";

            window.playerList.get(redPlayer[0].id).stats.wins++; // records win
        } else {
            logger.i(`${bluePlayer[0].name}#${bluePlayer[0].id}(Blue) won this game. CONN(${bluePlayer[0].conn}),AUTH(${bluePlayer[0].auth})`);
            
            winTeamFlag = 2; // if Blue wins
            placeholder.targetID = bluePlayer[0].id;
            placeholder.targetName = bluePlayer[0].name;
            placeholder.targetTeamName = "Blue";

            window.playerList.get(bluePlayer[0].id).stats.wins++; // records win
        }

        // processing wins streak
        var winStreakMilestone: number = window.winStreakCount;
        if(winStreakMilestone == 0) {
            window.winStreakCount++;
            if(winTeamFlag == 1) { // if Red wins
                window.room.setPlayerTeam(bluePlayer[0].id, 0); // blue loser move to spec team!
            }
            if(winTeamFlag == 2) { // if Blue wins
                window.room.setPlayerTeam(redPlayer[0].id, 0); // red loser move to spec team!
                window.room.setPlayerTeam(bluePlayer[0].id, 1); // blue winner move to red team!
            }
        } else if(winStreakMilestone == 1) {
            if(winTeamFlag == 1) { // if Red wins
                window.winStreakCount++;
                window.room.setPlayerTeam(bluePlayer[0].id, 0); // blue loser move to spec team!
            }
            if(winTeamFlag == 2) { // if Blue wins
                window.room.setPlayerTeam(redPlayer[0].id, 0); // red loser move to spec team!
                window.room.setPlayerTeam(bluePlayer[0].id, 1); // blue winner move to red team!
            }
        } else if(winStreakMilestone >= 2) {
            if(winTeamFlag == 1) { // if Red wins
                window.winStreakCount++;
                window.room.setPlayerTeam(bluePlayer[0].id, 0); // blue loser move to spec team!

                placeholder.streakWinCount = window.winStreakCount; // placeholder update
                window.room.sendAnnouncement(Tst.maketext(onTeamVictory.burning, placeholder), null, 0x00FF00, "normal", 2); // announce winning streak

                // update winning streak count
                window.playerList.get(redPlayer[0].id).stats.streaks = window.winStreakCount;
            }
            if(winTeamFlag == 2) { // if Blue wins
                window.winStreakCount = 1;
                window.room.setPlayerTeam(redPlayer[0].id, 0); // red loser move to spec team!
                window.room.setPlayerTeam(bluePlayer[0].id, 1); // blue winner move to red team!
            }
        }

        placeholder.streakWinCount = window.winStreakCount; // placeholder update
        window.room.sendAnnouncement(Tst.maketext(onTeamVictory.victory, placeholder), null, 0x00FF00, "normal", 1); // announce who win

        //data save
        setPlayerData(window.playerList.get(redPlayer[0].id));
        setPlayerData(window.playerList.get(bluePlayer[0].id));
    }
}