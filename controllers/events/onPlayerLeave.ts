import { PlayerObject } from "../../models/PlayerObject";
import { roomPlayersNumberCheck } from "../RoomTools";
import { Logger } from "../Logger";
import { gameRule } from "../../models/gamerules/onebyone.rule"
import * as Tst from "../Translator";
import { onPlayerLeave } from "../../resources/lang";

const logger: Logger = Logger.getInstance();

export function onPlayerLeaveListener(room: any, playerList: any, player: PlayerObject, isStatRecord: boolean): void {
    logger.i(`${player.name} has left.`); //logging

    if(playerList.has(player.id) == false) { // if the player wasn't registered in playerList (like banned player...)
            return; // exit this event
    }

    //set placeholder data
    var placeholder = {
        targetID: player.id
        ,targetName: player.name
        ,targetNameOld: player.name
        ,targetStatsTotal: playerList.get(player.id).stats.totals
        ,targetStatsWins: playerList.get(player.id).stats.wins
        ,targetStatsStreaks: playerList.get(player.id).stats.streaks
        ,targetStatsGoals: playerList.get(player.id).stats.goals
        ,targetStatsOgs: playerList.get(player.id).stats.ogs
        ,targetStatsLosepoints: playerList.get(player.id).stats.losePoints
    }

    // check number of players joined and change game mode
    if (roomPlayersNumberCheck(room) >= gameRule.requisite.minimumPlayers) {
        if(isStatRecord == false) {
            room.sendAnnouncement(Tst.maketext(onPlayerLeave.startRecord, placeholder), null, 0x00FF00, "normal", 0);
            isStatRecord = true;
        }
    } else {
        if(isStatRecord == true) {
            room.sendAnnouncement(Tst.maketext(onPlayerLeave.stopRecord, placeholder), null, 0x00FF00, "normal", 0);
            isStatRecord = false;
        }
    }

    playerList.delete(player.id); // delete from playerlist
}