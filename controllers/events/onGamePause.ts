import { PlayerObject } from "../../models/PlayerObject";
import * as Tst from "../Translator";
import { onGamePause } from "../../resources/lang";

export function onGamePauseListener(byPlayer : PlayerObject | null): void {
    var placeholder = { // unused but just trick
        pauseSecond: 3
    }
    window.room.sendAnnouncement(Tst.maketext(onGamePause.readyForStart, placeholder), null, 0x00FF00, "normal", 2); // message to order prepare game
    setTimeout(function() {
        window.room.pauseGame(false); // resume(unpause) (and will call onGameUnpause event)
      }, 3000); // 3secs
}