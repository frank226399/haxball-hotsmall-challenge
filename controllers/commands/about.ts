import * as Tst from "../Translator";
import { PlayerObject } from "../../models/PlayerObject";
import { command } from "../../resources/lang";

export function cmdAbout(byPlayer: PlayerObject): void {
    var placeholder ={
        _LaunchTime: localStorage.getItem('_LaunchTime')
    }
    window.room.sendAnnouncement(Tst.maketext(command.about, placeholder), byPlayer.id, 0x479947, "normal", 1);
}