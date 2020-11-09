

import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import * as Tst from "../Translator";
import { setPlayerData } from "../Storage";
import { onGameStart } from "../../resources/lang";

const logger: Logger = Logger.getInstance();

export function onGameStartListener(byPlayer: PlayerObject | null, room:any, playerList: any): void {
    // mod switching
    window.isGameNow = true;

    // logging
    if(byPlayer !== null) {
        logger.i(`The game started by ${byPlayer.name}#${byPlayer.id}. CONN(${byPlayer.conn}),AUTH(${byPlayer.auth})`);
    } else {
        logger.i(`The game started by bot system.`);
    }

    if (window.isStatRecord == true) { // only when stats recording mode
        var redPlayer: PlayerObject = room.getPlayerList().filter((player: PlayerObject) => player.team == 1); // get red team
        var bluePlayer: PlayerObject = room.getPlayerList().filter((player: PlayerObject) => player.team == 2); // get blue team

        // total game counting stats update
        playerList.get(redPlayer.id).stats.totals++;
        playerList.get(bluePlayer.id).stats.totals++;

        setPlayerData(playerList.get(redPlayer.id));
        setPlayerData(playerList.get(bluePlayer.id));

        //set placeholder
        var placeholder = {
            redTargetID: redPlayer.id
            ,redTargetName: redPlayer.name
            ,blueTargetID: bluePlayer.id
            ,blueTargetName: bluePlayer.name
        }

        //message to game room
        room.sendAnnouncement(Tst.maketext(onGameStart.startGame, placeholder), null, 0x00FF00, "normal", 0);

        //log it
        logger.i(`${placeholder.redTargetName}#${placeholder.redTargetID} and ${placeholder.blueTargetName}#${placeholder.blueTargetID}has participated this challenge.`);
    }
}