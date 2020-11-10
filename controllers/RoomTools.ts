import { PlayerObject } from "../models/PlayerObject";

export function roomPlayersNumberCheck(): number {
    // return number of players joined this room
    return window.room.getPlayerList().filter((player: PlayerObject) => player.id != 0).length;
}

export function roomTeamPlayersNumberCheck(team: number): number {
    // return number of each team squad
    return window.room.getPlayerList().filter((player: PlayerObject) => player.team == team).length;
}

export function roomMatchingPlayersNumberCheck(): number {
    // return number of player who in match
    return window.room.getPlayerList().filter((player: PlayerObject) => player.team != 0).length;
}

export function getScoresByTeam(team: number): number {
    //return how many the team got point in this game
    switch(team) {
        case 0: {
            return 0;
        }
        case 1: {
            return window.room.getScores().red;
        }
        case 2: {
            return window.room.getScores().blue;
        }
        default: {
            return 0;
        }
    }
}