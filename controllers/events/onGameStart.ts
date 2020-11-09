

import { PlayerObject } from "../../models/PlayerObject";
import { Logger } from "../Logger";
import { setPlayerData } from "../Storage";

const logger: Logger = Logger.getInstance();

export function onGameStartListener(byPlayer: PlayerObject | null, room:any, playerList: any): void {
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

        //log it
        logger.i(`${placeholder.redTargetName}#${placeholder.redTargetID} and ${placeholder.blueTargetName}#${placeholder.blueTargetID}has participated this challenge.`);
    }
}