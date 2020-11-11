import { PlayerObject } from "../../models/PlayerObject";
import { command, commontexts, onGameTick } from "../../resources/lang";

export function onGameTickListener(): void { //this listner will be called 60 times per 1 second.
    window.afkDetector.tickCounter++;
    if(window.afkDetector.tickCounter == 600) { // AFK DETECTION Sensitivity : about 5 seconds (60*10)
        switch(window.afkDetector.teamPicker) {
            case 1: { // turn for red kicks the ball
                if(window.afkDetector.redActivity == false) { // if red player is unactivity
                    var eachTeamPlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team == 1); // get red team squad (actually just single player will be exist)
                    //window.room.sendAnnouncement(onGameTick.warningAfkPlayer, eachTeamPlayers[0].id, 0xFF0000, "bold", 2); // notify
                    window.room.kickPlayer(eachTeamPlayers[0].id, onGameTick.kickAfkPlayer, false) //kick him!
                }
                break;
            }
            case 2: { // turn for blue kicks the ball
                if(window.afkDetector.blueActivity == false) { // if blue player is unactivity
                    var eachTeamPlayers: PlayerObject[] = window.room.getPlayerList().filter((player: PlayerObject) => player.team == 2); // get blue team squad (actually just single player will be exist)
                    window.room.kickPlayer(eachTeamPlayers[0].id, onGameTick.kickAfkPlayer, false) //kick him!
                }
                break;
            }
        }

        if(Math.random() < 0.25) {
            window.room.sendAnnouncement(commontexts.advertise, null, 0x777777, "normal", 0); // advertisement
        }

        window.afkDetector.tickCounter = 0; // reset counter
	}
}