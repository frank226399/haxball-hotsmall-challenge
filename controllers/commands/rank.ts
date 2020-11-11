// TODO: 가장 마지막에 구현할것

import { PlayerObject } from "../../models/PlayerObject";
import { command } from "../../resources/lang";

export function cmdRank(byPlayer: PlayerObject): void {
    window.room.sendAnnouncement(command.rank, byPlayer.id, 0x479947, "normal", 1);
}