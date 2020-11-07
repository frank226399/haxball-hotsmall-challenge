// haxball-hotsmall-chllenge by dapucita
// This is the main part of the bot

// import modules
import {
    Logger
} from "./controllers/Logger";
import {
    RoomConfig
} from "./models/RoomConfig";
import {
    Player
} from "./models/Player";
import {
    gameRule
} from "./models/gamerules/onebyone.rule";
import * as eventListener from "./controllers/events/eventListeners";
import { PlayerObject } from "./models/PlayerObject";
import { ScoresObject } from "./models/ScoreObject";
import { KickStack } from "./models/BallKickTrace";

window.logQueue = []; // init for log queue

const logger: Logger = Logger.getInstance();
const ballKickStack: KickStack = KickStack.getInstance();
window.isStatRecord = false; //TRUE means that recording stats now.

const botRoomConfig: RoomConfig = JSON.parse(getCookieFromHeadless('botConfig'));

/* logger.c("====");
logger.c("haxball-hotsmall-challange");
logger.c(`The authentication token is conveyed via cookie(${botRoomConfig.token})`);
logger.c("===="); */

const playerList: Map<number, Player> = new Map(); // playerList:Player[] is an Map object. // playerList.get(player.id).name; : usage for playerList

var room: any = window.HBInit(botRoomConfig);
initialiseRoom();

function initialiseRoom(): void {
    // Write initialising processes here.
    const nowDate: Date = new Date();
    localStorage.setItem('_LaunchTime', nowDate.toString()); // save time the bot launched in localStorage
    logger.i(`This game room is opened at ${nowDate.toString()}.`);

    room.setCustomStadium(gameRule.defaultMap);
    room.setScoreLimit(gameRule.requisite.scoreLimit);
    room.setTimeLimit(gameRule.requisite.timeLimit);
    room.setTeamsLock(gameRule.requisite.teamLock);

    room.onPlayerJoin = (player: PlayerObject): void => eventListener.onPlayerJoinListener(room, playerList, player);
    room.onPlayerLeave = (player: PlayerObject): void => eventListener.onPlayerLeaveListener(room, playerList, player);
    room.onTeamVictory = (scores: ScoresObject): void => {}
    room.onPlayerChat = (player: PlayerObject, message: String): boolean => true;
    room.onPlayerBallKick = (player: PlayerObject): void => eventListener.onPlayerBallKickListener(player, ballKickStack);
    room.onTeamGoal = (team: number): void => eventListener.onTeamGoalListener(team, ballKickStack, room, playerList);
    room.onGameStart = (byPlayer: PlayerObject): void => {}
    room.onGameStop = (byPlayer: PlayerObject): void => eventListener.onGameStopListener(byPlayer, ballKickStack);
    room.onPlayerAdminChange = (changedPlayer: PlayerObject, byPlayer: PlayerObject): void => {}
    room.onPlayerTeamChange = (changedPlayer: PlayerObject, byPlayer: PlayerObject): void => {}
    room.onPlayerKicked = (kickedPlayer: PlayerObject, reason: string, ban: boolean, byPlayer: PlayerObject): void => {}
    room.onGameTick = (): void => {}
    room.onGamePause = (byPlayer: PlayerObject): void => {}
    room.onGameUnpause = (byPlayer: PlayerObject): void => {}
    room.onPositionReset = (): void => {}
    room.onPlayerActivity = (player: PlayerObject): void => {}
    room.onStadiumChange = (newStadiumName: string, byPlayer: PlayerObject): void => {}
    room.onRoomLink = (url: string): void => eventListener.onRoomLinkListener(url);
    room.onKickRateLimitSet = (min: number, rate: number, burst: number, byPlayer: PlayerObject): void => {}
}

function getCookieFromHeadless(name: string): string {
    var result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : '';
}