import { Player } from "../../models/Player";
import { PlayerObject, PlayerStorage } from "../../models/PlayerObject";
import { getPlayerData, setPlayerData } from "../Storage";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { onPlayerJoin } from "../../resources/lang";

const logger: Logger = Logger.getInstance();

export function onPlayerJoinListener(room: any, playerList: any, player: PlayerObject): void {
    var placeholder = {
        targetID: player.id
        ,targetName: player.name
        ,targetNameOld: player.name
        ,targetStatsTotal: 0
        ,targetStatsWins: 0
        ,targetStatsStreaks: 0
        ,targetStatsGoals: 0
        ,targetStatsOgs: 0
        ,targetStatsLosepoints: 0
    }
    // logging into console (debug)
    logger.c(`${player.name} has joined. ID(${player.id}),CONN(${player.conn}),AUTH(${player.auth})`);

    // if this player has already joinned by other connection
    playerList.forEach((eachPlayer: Player) => {
        if (eachPlayer.conn == player.conn) {
            logger.c(`${player.name} was joined but kicked for double joinning.(origin:${eachPlayer.name}#${eachPlayer.id},conn:${player.conn})`);
            room.kickPlayer(player.id, Tst.maketext(onPlayerJoin.doubleJoinningKick, placeholder), false); // kick
            room.sendAnnouncement(Tst.maketext(onPlayerJoin.doubleJoinningMsg, placeholder), null, 0xFF0000, "normal", 0); // notify
            return; // exit from this join event
        }
    });

    // add the player who joined into playerList by creating class instance
    if (localStorage.getItem(player.auth) !== null) {
        // if this player is not new player
        var loadedData: PlayerStorage | null = getPlayerData(player.auth);
        if (loadedData !== null) {
            playerList.set(player.id, new Player(player, {
                totals: loadedData.totals,
                wins: loadedData.wins,
                streaks: loadedData.streaks,
                goals: loadedData.goals,
                ogs: loadedData.ogs,
                losePoints: loadedData.losePoints
            }));

            if (player.name != loadedData.name) {
                // if this player changed his/her name
                // notify that fact to other players only once ( it will never be notified if he/she rejoined next time)
                placeholder.targetNameOld = loadedData.name
                room.sendAnnouncement(Tst.maketext(onPlayerJoin.changename, placeholder), null, 0x00FF00, "normal", 0);
            }
        }
    } else {
        // if new player
        // create a Player Object
        playerList.set(player.id, new Player(player, {
            totals: 0,
            wins: 0,
            streaks: 0,
            goals: 0,
            ogs: 0,
            losePoints: 0
        }));
    }

    setPlayerData(playerList.get(player.id)); // register(or update) in localStorage
}