import { Player } from "../../models/Player";
import { PlayerObject, PlayerStorage } from "../../models/PlayerObject";
import { getPlayerData, setPlayerData } from "../Storage";
import { roomPlayersNumberCheck, roomMatchingPlayersNumberCheck } from "../RoomTools";
import { Logger } from "../Logger";
import { gameRule } from "../../models/gamerules/onebyone.rule"
import * as Tst from "../Translator";
import { onPlayerJoin } from "../../resources/lang";
import { tweaks_doubleJoinBlock } from "../../tweaks";

const logger: Logger = Logger.getInstance();

export function onPlayerJoinListener(player: PlayerObject): void {
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
        ,targetStatsBestrecord: 0
    }
    // logging into console
    logger.i(`${player.name}#${player.id} has joined. CONN(${player.conn}),AUTH(${player.auth})`);

    // if this player has already joinned by other connection (dobule joinning)
    if (tweaks_doubleJoinBlock == true) {
        window.playerList.forEach((eachPlayer: Player) => {
            if (eachPlayer.conn == player.conn) {
                logger.i(`${player.name}#${player.id} was joined but kicked for double joinning.(origin:${eachPlayer.name}#${eachPlayer.id},conn:${player.conn})`);
                window.room.kickPlayer(player.id, Tst.maketext(onPlayerJoin.doubleJoinningKick, placeholder), false); // kick
                window.room.sendAnnouncement(Tst.maketext(onPlayerJoin.doubleJoinningMsg, placeholder), null, 0xFF0000, "normal", 0); // notify
                return; // exit from this join event
            }
        });
    }
    // add the player who joined into playerList by creating class instance
    if (localStorage.getItem(player.auth) !== null) {
        // if this player is not new player
        var loadedData: PlayerStorage | null = getPlayerData(player.auth);
        if (loadedData !== null) {
            window.playerList.set(player.id, new Player(player, {
                totals: loadedData.totals,
                wins: loadedData.wins,
                streaks: loadedData.streaks,
                goals: loadedData.goals,
                ogs: loadedData.ogs,
                losePoints: loadedData.losePoints,
                bestrecord: loadedData.bestrecord
            }));

            //update placeholder
            placeholder.targetStatsTotal = loadedData.totals;
            placeholder.targetStatsWins = loadedData.wins;
            placeholder.targetStatsStreaks = loadedData.streaks; //keep old WinStreaks cuz show stats
            placeholder.targetStatsGoals = loadedData.goals;
            placeholder.targetStatsOgs = loadedData.ogs;
            placeholder.targetStatsLosepoints = loadedData.losePoints;
            placeholder.targetStatsBestrecord = loadedData.bestrecord

            if (player.name != loadedData.name) {
                // if this player changed his/her name
                // notify that fact to other players only once ( it will never be notified if he/she rejoined next time)
                placeholder.targetNameOld = loadedData.name
                window.room.sendAnnouncement(Tst.maketext(onPlayerJoin.changename, placeholder), null, 0x00FF00, "normal", 0);
                logger.i(`${player.name}#${player.id} has changed his name from ${loadedData.name}. CONN(${player.conn}),AUTH(${player.auth})`); // log it
            }

            window.room.sendAnnouncement(Tst.maketext(onPlayerJoin.resetWinStreak, placeholder), player.id, 0x00FF00, "normal", 2); 
        }
    } else {
        // if new player
        // create a Player Object
        window.playerList.set(player.id, new Player(player, {
            totals: 0,
            wins: 0,
            streaks: 0,
            goals: 0,
            ogs: 0,
            losePoints: 0,
            bestrecord: 0
        }));
    }

    var currentPlayersCount: number = roomPlayersNumberCheck(); // get how many players last
    // check number of players joined and change game mode
    if (currentPlayersCount >= gameRule.requisite.minimumPlayers) {
        if(window.isStatRecord !== true) {
            window.room.sendAnnouncement(Tst.maketext(onPlayerJoin.startRecord, placeholder), null, 0x00FF00, "normal", 0);
            window.isStatRecord = true;
        }
    } else {
        if(window.isStatRecord !== false) {
            window.room.sendAnnouncement(Tst.maketext(onPlayerJoin.stopRecord, placeholder), null, 0x00FF00, "normal", 0);
            window.isStatRecord = false;
        }
    }
    setPlayerData(window.playerList.get(player.id)); // register(or update) in localStorage

    if(window.isGameNow == false) { //if not in playing
        var specPlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team == 0); // get spec team
        
        window.room.setPlayerTeam(specPlayers[0].id, 1); // set first player to red team
        if(currentPlayersCount == 1) { // when only single player
            window.room.setCustomStadium(gameRule.readyMap); // map change to for ready map
            window.room.startGame(); // and start game 
        } else if(currentPlayersCount >= gameRule.requisite.minimumPlayers) { // when the match can be open
            window.room.setPlayerTeam(specPlayers[1].id, 2); // set second player to blue team
            window.room.setCustomStadium(gameRule.defaultMap); // map change to for default matching map
            window.room.startGame(); // and start game 
        }
    } else if(window.isGameNow == true && roomMatchingPlayersNumberCheck() == 1) { // if just one player is playing training(ready) map
        
        window.room.stopGame(); // first, stop game
    }
}