import { PlayerObject } from "../../models/PlayerObject";
import { roomPlayersNumberCheck } from "../RoomTools";
import { Logger } from "../Logger";
import { gameRule } from "../../models/gamerules/onebyone.rule"
import * as Tst from "../Translator";
import { onPlayerLeave } from "../../resources/lang";
import { setPlayerData } from "../Storage";

const logger: Logger = Logger.getInstance();

export function onPlayerLeaveListener(player: PlayerObject): void {
    var isWillBeGameStop: boolean = false; //flag for game stop

    logger.i(`${player.name}#${player.id} has left.`); //logging

    if(window.playerList.has(player.id) == false) { // if the player wasn't registered in playerList (like banned player...)
            return; // exit this event
    }

    //set placeholder data
    var placeholder = {
        targetID: player.id
        ,targetName: player.name
        ,targetNameOld: player.name
        ,targetStatsTotal: window.playerList.get(player.id).stats.totals
        ,targetStatsWins: window.playerList.get(player.id).stats.wins
        ,targetStatsStreaks: window.playerList.get(player.id).stats.streaks
        ,targetStatsGoals: window.playerList.get(player.id).stats.goals
        ,targetStatsOgs: window.playerList.get(player.id).stats.ogs
        ,targetStatsLosepoints: window.playerList.get(player.id).stats.losePoints
        ,targetStatsBestrecord: window.playerList.get(player.id).stats.bestrecord
    }

    // check game mode 
    if(window.isStatRecord == true && window.isGameNow == true) { // if the game was on play situation
        if(player.team != 0) { // when he who left is not spec team
            //get who last
            var lastPlayer: PlayerObject[] = window.room.getPlayerList().filter((surviveplayer: PlayerObject) => surviveplayer.team != 0 &&surviveplayer.team != player.team);
            
            //regard as win
            if(lastPlayer[0].team == 1) {
                window.winStreakCount++;

            } else if(lastPlayer[0].team == 2) {
                window.winStreakCount = 1;
            }
            logger.i(`Other last player finally win because ${player.name}#${player.id} has left.`); //logging
            window.room.sendAnnouncement(Tst.maketext(onPlayerLeave.giveupGame, placeholder), null, 0x00FF00, "normal", 1); // announce who left gave up
            
            window.playerList.get(lastPlayer[0].id).stats.wins++; // records win
            setPlayerData(window.playerList.get(lastPlayer[0].id));

            isWillBeGameStop = true;
            window.room.setPlayerTeam(lastPlayer[0].id, 1) // set last player's team to red
            
        }
    }

    // check number of players joined and change game mode
    var currentPlayersCount: number = roomPlayersNumberCheck();
    if (currentPlayersCount >= gameRule.requisite.minimumPlayers) {
        if(window.isStatRecord == false) {
            window.room.sendAnnouncement(Tst.maketext(onPlayerLeave.startRecord, placeholder), null, 0x00FF00, "normal", 0);
            window.isStatRecord = true;
        }
    } else {
        if(window.isStatRecord == true) {
            window.room.sendAnnouncement(Tst.maketext(onPlayerLeave.stopRecord, placeholder), null, 0x00FF00, "normal", 0);
            window.isStatRecord = false;
        }
    }

    if( currentPlayersCount == 0 ) { // if no one last
        isWillBeGameStop = true;
    }

    setPlayerData(window.playerList.get(player.id)); // save
    window.playerList.delete(player.id); // delete from playerlist

    if( isWillBeGameStop == true ) {
        window.room.stopGame();
    }
}