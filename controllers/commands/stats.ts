// TODO: 먼저구현!
import * as Tst from "../Translator";
import { PlayerObject } from "../../models/PlayerObject";
import { command } from "../../resources/lang";
import { calcGoalsPerGame, calcLoseGoalsPerGame, calcOGsPerGame, calcWinsRate } from "../Statistics";

export function cmdStats(byPlayer: PlayerObject, message?: string): void {
    if (message !== undefined) {
        //stats for other player who are on this room
        if (message.charAt(0) == "#") {
            let targetStatsID: number = parseInt(message.substr(1), 10);
            if (isNaN(targetStatsID) != true && window.playerList.has(targetStatsID) == true) { // if the value is not NaN and there's the player
                let placeholder = {
                    targetID: targetStatsID
                    , targetName: window.playerList.get(targetStatsID).name
                    , targetStatsTotal: window.playerList.get(targetStatsID).stats.totals
                    , targetStatsWins: window.playerList.get(targetStatsID).stats.wins
                    , targetStatsStreaks: window.playerList.get(targetStatsID).stats.streaks
                    , targetStatsGoals: window.playerList.get(targetStatsID).stats.goals
                    , targetStatsOgs: window.playerList.get(targetStatsID).stats.ogs
                    , targetStatsLosepoints: window.playerList.get(targetStatsID).stats.losePoints
                    , targetStatsBestrecord: window.playerList.get(targetStatsID).stats.bestrecord
                    , targetStatsWinRate: calcWinsRate(window.playerList.get(targetStatsID).stats.totals, window.playerList.get(targetStatsID).stats.wins)
                    , targetStatsGoalsPerGame: calcGoalsPerGame(window.playerList.get(targetStatsID).stats.totals, window.playerList.get(targetStatsID).stats.goals)
                    , targetStatsOgsPerGame: calcOGsPerGame(window.playerList.get(targetStatsID).stats.totals, window.playerList.get(targetStatsID).stats.ogs)
                    , targetStatsLostGoalsPerGame: calcLoseGoalsPerGame(window.playerList.get(targetStatsID).stats.totals, window.playerList.get(targetStatsID).stats.losePoints)
                }
                window.room.sendAnnouncement(Tst.maketext(command.stats.statsMsg, placeholder), byPlayer.id, 0x479947, "normal", 1);
            } else {
                window.room.sendAnnouncement(command.stats._ErrorNoPlayer, byPlayer.id, 0xFF7777, "normal", 2);
            }
        } else {
            window.room.sendAnnouncement(command.stats._ErrorNoPlayer, byPlayer.id, 0xFF7777, "normal", 2);
        }
    } else {
        //stats for him/herself
        let placeholder = {
            targetID: byPlayer.id
            , targetName: byPlayer.name
            , targetStatsTotal: window.playerList.get(byPlayer.id).stats.totals
            , targetStatsWins: window.playerList.get(byPlayer.id).stats.wins
            , targetStatsStreaks: window.playerList.get(byPlayer.id).stats.streaks
            , targetStatsGoals: window.playerList.get(byPlayer.id).stats.goals
            , targetStatsOgs: window.playerList.get(byPlayer.id).stats.ogs
            , targetStatsLosepoints: window.playerList.get(byPlayer.id).stats.losePoints
            , targetStatsBestrecord: window.playerList.get(byPlayer.id).stats.bestrecord
            , targetStatsWinRate: calcWinsRate(window.playerList.get(byPlayer.id).stats.totals, window.playerList.get(byPlayer.id).stats.wins)
            , targetStatsGoalsPerGame: calcGoalsPerGame(window.playerList.get(byPlayer.id).stats.totals, window.playerList.get(byPlayer.id).stats.goals)
            , targetStatsOgsPerGame: calcOGsPerGame(window.playerList.get(byPlayer.id).stats.totals, window.playerList.get(byPlayer.id).stats.ogs)
            , targetStatsLostGoalsPerGame: calcLoseGoalsPerGame(window.playerList.get(byPlayer.id).stats.totals, window.playerList.get(byPlayer.id).stats.losePoints)
        }
        window.room.sendAnnouncement(Tst.maketext(command.stats.statsMsg, placeholder), byPlayer.id, 0x479947, "normal", 1);
    }
}