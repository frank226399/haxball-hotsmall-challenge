import { PlayerObject } from "../models/PlayerObject";

export function roomPlayersNumberCheck(room: any): number {
    // return number of players joined this room
    return room.getPlayerList().filter((player: PlayerObject) => player.id != 0).length;
}