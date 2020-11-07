import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { onTeamVictory } from "../../resources/lang";
import { setPlayerData } from "../../controllers/Storage";
import { ScoresObject } from "../../models/ScoreObject";

const logger: Logger = Logger.getInstance();

export function onTeamVictoryListener(scores: ScoresObject, room: any, playerList: any): void {
    //set placeholder
    var placeholder = {
        targetID: 0
        ,targetName: ''
        ,targetTeamName: ''
        ,redScore: scores.red
        ,blueScore: scores.blue
        ,streakWinCounts: window.winStreakCount
    }  
    if (window.isStatRecord == true) { // only when stats recording mode
        var winTeamFlag: number;

        var redPlayer: PlayerObject = room.getPlayerList().filter((player: PlayerObject) => player.team == 1); // get red team
        var bluePlayer: PlayerObject = room.getPlayerList().filter((player: PlayerObject) => player.team == 2); // get blue team

        if(scores.red > scores.blue) {
            logger.i(`${redPlayer.name}#${redPlayer.id}(Red) won this game. CONN(${redPlayer.conn}),AUTH(${redPlayer.auth})`);

            winTeamFlag = 1; // if Red wins
            placeholder.targetTeamName = "Red";

            playerList.get(redPlayer.id).stats.wins++; // records win
        } else {
            logger.i(`${redPlayer.name}#${redPlayer.id}(Blue) won this game. CONN(${redPlayer.conn}),AUTH(${redPlayer.auth})`);
            winTeamFlag = 2; // if Blue wins
            placeholder.targetTeamName = "Blue";

            playerList.get(bluePlayer.id).stats.wins++; // records win
        }

        // processing wins streak
        var winStreakMilestone: number = window.winStreakCount;
        if(winStreakMilestone == 0) {
            window.winStreakCount++;
            if(winTeamFlag == 1) { // if Red wins
                room.setPlayerTeam(bluePlayer.id, 1); // blue loser move to spec team!
            }
            if(winTeamFlag == 2) { // if Blue wins
                room.setPlayerTeam(redPlayer.id, 0); // red loser move to spec team!
                room.setPlayerTeam(bluePlayer.id, 1); // blue winner move to red team!
            }
        } else if(winStreakMilestone == 1) {
            if(winTeamFlag == 1) { // if Red wins
                window.winStreakCount++;
                room.setPlayerTeam(bluePlayer.id, 1); // blue loser move to spec team!
            }
            if(winTeamFlag == 2) { // if Blue wins
                room.setPlayerTeam(redPlayer.id, 0); // red loser move to spec team!
                room.setPlayerTeam(bluePlayer.id, 1); // blue winner move to red team!
            }
        } else if(winStreakMilestone >= 2) {
            if(winTeamFlag == 1) { // if Red wins
                window.winStreakCount++;
                room.setPlayerTeam(bluePlayer.id, 1); // blue loser move to spec team!

                placeholder.streakWinCounts = window.winStreakCount; // placeholder update
                room.sendAnnouncement(Tst.maketext(onTeamVictory.burning, placeholder), null, 0x00FF00, "normal", 0); // announce winning streak

                // update winning streak count
                playerList.get(redPlayer.id).stats.streaks = window.winStreakCount;
            }
            if(winTeamFlag == 2) { // if Blue wins
                window.winStreakCount = 1;
                room.setPlayerTeam(redPlayer.id, 0); // red loser move to spec team!
                room.setPlayerTeam(bluePlayer.id, 1); // blue winner move to red team!
            }
        }

        placeholder.streakWinCounts = window.winStreakCount; // placeholder update
        room.sendAnnouncement(Tst.maketext(onTeamVictory.victory, placeholder), null, 0x00FF00, "normal", 0); // announce who win

        //data save
        setPlayerData(playerList.get(redPlayer.id));
        setPlayerData(playerList.get(bluePlayer.id));
    }
}