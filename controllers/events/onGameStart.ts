

import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { setPlayerData } from "../Storage";
import { onGameStart } from "../../resources/lang";

const logger: Logger = Logger.getInstance();

export function onGameStartListener(byPlayer: PlayerObject | null): void {
    // mod switching
    window.isGameNow = true;

    // logging
    if(byPlayer !== null) {
        logger.i(`The game started by ${byPlayer.name}#${byPlayer.id}. CONN(${byPlayer.conn}),AUTH(${byPlayer.auth})`);
    } else {
        logger.i(`The game started by bot system.`);
    }

    if (window.isStatRecord == true) { // only when stats recording mode
        //var redPlayer: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team == 1); // get red team
        //var bluePlayer: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team == 2); // get blue team
        var gamePlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team != 0); // except Spectators players
        var redPlayer: PlayerObject[] = gamePlayers.filter((player: PlayerObject) => player.team == 1); // except non Red players
        var bluePlayer: PlayerObject[] = gamePlayers.filter((player: PlayerObject) => player.team == 2); // except non Blue players
        
        // total game counting stats update
        window.playerList.get(redPlayer[0].id).stats.totals++; 
        window.playerList.get(bluePlayer[0].id).stats.totals++;

        setPlayerData(window.playerList.get(redPlayer[0].id));
        setPlayerData(window.playerList.get(bluePlayer[0].id));

        //set placeholder
        var placeholder = {
            redTargetID: redPlayer[0].id
            ,redTargetName: redPlayer[0].name
            ,blueTargetID: bluePlayer[0].id
            ,blueTargetName: bluePlayer[0].name
        }

        //message to game room
        window.room.sendAnnouncement(Tst.maketext(onGameStart.startGame, placeholder), null, 0x00FF00, "normal", 0);

        //log it
        logger.i(`${placeholder.redTargetName}#${placeholder.redTargetID} and ${placeholder.blueTargetName}#${placeholder.blueTargetID}has participated this challenge.`);
    }
}